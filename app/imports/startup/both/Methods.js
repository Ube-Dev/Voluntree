import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Events } from '../../api/event/EventCollection';
import { Skills } from '../../api/skill/SkillCollection';
import { Organization } from '../../api/organization/OrganizationCollection';
import { MainCategory } from '../../api/category/MainCategoryCollection';
import { SubCategory } from '../../api/category/SubCategoryCollection';

const createUserProfile = 'UserProfiles.define';

Meteor.methods({
  'UserProfiles.define': function (data) {
    check(data, Object);
    try {
      return UserProfiles.define(data);
    } catch (error) {
      // Handle or log the error here
      throw new Meteor.Error('create-failed', 'Failed to create user profile: ', error);
    }
  },
});

const updateUserProfile = 'UserProfiles.update';

Meteor.methods({
  'UserProfiles.update': function (docID, updateData) {
    check(docID, String);
    check(updateData, Object);
    try {
      UserProfiles.update(docID, updateData);
    } catch (error) {
      // Handle or log the error here
      throw new Meteor.Error('update-failed', 'Failed to update user profile: ', error);
    }
  },
});

const removeUserProfile = 'UserProfiles.remove';

Meteor.methods({
  'UserProfiles.remove': function (docID) {
    check(docID, String);
    try {
      return UserProfiles.removeIt(docID);
    } catch (error) {
      throw new Meteor.Error('delete-failed', 'Failed to delete user profile: ', error);
    }
  },
});

const createEvent = 'Events.define';

Meteor.methods({
  'Events.define': function (data) {
    check(data, Object);
    try {
      return Events.define(data);
    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to add new event: ', error);
    }
    // if (requiredSkills) {
    //   requiredSkills.map(skill => RequiredSkills.define({ requiredSkills: skill, event: title }));
    //   requiredSkills.map(skill => Skills.define({ skills: skill }));
    // }
  },
});
const updateEvent = 'Events.update';

Meteor.methods({
  'Events.update': function (docID, data) {
    check(docID, String);
    check(data, Object);
    try {
      Events.update(docID, data);
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update event: ', error);
    }
    // skills.map(skill => RequiredSkills.define(skill, title));
  },
});

const removeEvent = 'Events.remove';

Meteor.methods({
  'Events.remove': function (docID) {
    check(docID, String);
    try {
      return Events.removeIt(docID);
    } catch (error) {
      throw new Meteor.Error('delete-failed', 'Failed to delete event: ', error);
    }
  },
});

const createSkill = 'Skills.define';

Meteor.methods({
  'Skills.define': function (data) {
    check(data, Object);
    try {
      return Skills.define(data);
    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new skill: ', error);
    }
  },
});

const removeSkill = 'Skills.remove';

Meteor.methods({
  'Skills.remove': function (data) {
    check(data, Object);
    try {
      return Skills.removeIt(data);
    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new skill: ', error);
    }
  },
});

const createOrganization = 'Organization.define';

Meteor.methods({
  'Organization.define': function (data) {
    check(data, Object);
    try {
      return Organization.define(data);
    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new organization: ', error);
    }
  },
});

const updateOrganization = 'Organization.update';

Meteor.methods({
  'Organization.update': function (docID, data) {
    check(data, Object);
    check(docID, String);
    try {
      Organization.update(data);
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update organization: ', error);
    }
  },
});

const removeOrganization = 'Organization.remove';

Meteor.methods({
  'Organization.remove': function (docID) {
    check(docID, String);
    try {
      Organization.removeIt(docID);
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove organization: ', error);
    }
  },
});

const loadDefaultCategories = 'loadDefaultCategories';

Meteor.methods({
  loadDefaultCategories: function (data) {
    check(data, Object);
    try {
      Object.entries(data).forEach(([mainCategory, subCategories]) => {
        // Define the main category and get its ID.
        console.log(mainCategory);
        console.log(subCategories);
        const mainCategoryId = MainCategory.define({ category: mainCategory });

        // Iterate over each subcategory in the array.
        subCategories.forEach(subCategory => {
          // Define the subcategory with the main category ID.
          SubCategory.define({ category: subCategory, parentID: mainCategoryId });
        });
      });
    } catch (error) {
      throw new Meteor.Error('loadDefaultCategories-failed', 'Failed to load default categories: ', error);
    }
  },
});

// define
// update
// remove cascade
const createMainCategory = 'MainCategory.define';

Meteor.methods({
  'MainCategory.define': function (data) {
    check(data, Object);
    try {
      return MainCategory.define(data);
    } catch (error) {
      throw new Meteor.Error('MainCategory.define', 'Failed to create new main categories: ', error);
    }
  },
});

const removeMainCategory = 'MainCategory.remove';

Meteor.methods({
  'MainCategory.remove': function (docID) {
    check(docID, String);

    // Define variables to store the state before the transaction
    let mainCategoryBeforeRemove;
    let subCategoryBeforeUpdate;

    try {
      // Store the state before the transaction begins
      mainCategoryBeforeRemove = MainCategory.findOne(docID);
      subCategoryBeforeUpdate = SubCategory.find({ parentID: mainCategoryBeforeRemove._id }).fetch();

      // Perform the transaction
      const parentID = MainCategory.removeIt(docID);

      // Update documents with matching parentID
      SubCategory._collection.update(
        { parentID: parentID },
        { $set: { parentID: '' } },
        { multi: true },
      );
    } catch (error) {
      // If any error occurs during the transaction, revert the changes
      if (mainCategoryBeforeRemove) {
        MainCategory._collection.insert(mainCategoryBeforeRemove);
      }
      if (subCategoryBeforeUpdate) {
        subCategoryBeforeUpdate.forEach(category => {
          SubCategory._collection.update(
            { _id: category._id },
            { $set: { parentID: category.parentID } },
          );
        });
      }

      // Throw an error indicating the removal failed and rollback was performed
      throw new Meteor.Error('remove-failed', 'Either failed to remove category or transaction: ', error);
    }
  },
});

const createSubcategory = 'Subcategory.define';

Meteor.methods({
  'Subcategory.define': function (data) {
    check(data, Object);
    try {
      return SubCategory.define(data);
    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new sub category: ', error);
    }
  },
});

const updateSubcategory = 'Subcategory.update';

Meteor.methods({
  'Subcategory.update': function (data) {
    check(data, Object);
    try {
      SubCategory.update(data);
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update sub category: ', error);
    }
  },
});

const removeSubcategory = 'Subcategory.remove';

Meteor.methods({
  'Subcategory.remove': function (docID) {
    check(docID, String);
    try {
      SubCategory.removeIt(docID);
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove sub category: ', error);
    }
  },
});

export {
  updateUserProfile, createUserProfile, removeUserProfile, updateEvent, createEvent, removeEvent, createSkill, removeSkill,
  createOrganization, updateOrganization, removeOrganization, loadDefaultCategories, createMainCategory, removeMainCategory,
  createSubcategory, updateSubcategory, removeSubcategory,

};
