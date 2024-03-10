import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Events } from '../../api/event/EventCollection';
import { Skills } from '../../api/skill/SkillCollection';
import { Organization } from '../../api/organization/OrganizationCollection';
import { MainCategory } from '../../api/category/MainCategoryCollection';
import { SubCategory } from '../../api/category/SubCategoryCollection';
import { ROLE } from '../../api/role/Role';

// app\imports\api\user\UserProfileCollection.methods.js
const createUserProfile = 'UserProfiles.define';
const updateUserProfile = 'UserProfiles.update';
const removeUserProfile = 'UserProfiles.remove';

// app\imports\api\event\EventCollection.methods.js
const createEvent = 'Events.define';
const updateEvent = 'Events.update';
const removeEvent = 'Events.remove';

// app\imports\api\skill\SkillCollection.methods.js
const createSkill = 'Skills.define';
const removeSkill = 'Skills.remove';


// app\imports\api\organization\OrganizationCollection.methods.js
const createOrganization = 'Organization.define';
const updateOrganization = 'Organization.update';
const removeOrganization = 'Organization.remove';

// app\imports\api\category\CategoryCollection.methods.js
const createMainCategory = 'MainCategory.define';
const removeMainCategory = 'MainCategory.remove';
const createSubcategory = 'Subcategory.define';
const updateSubcategory = 'Subcategory.update';
const removeSubcategory = 'Subcategory.remove';

const updateUserAccount = 'UserAccount.update';

Meteor.methods({
  'UserAccount.update': function (docID, data) {
    check(docID, String);
    check(data, Object);
    try {
      if (data.privilege) {
        Roles.addUsersToRoles(docID, data.privilege, ROLE.USER);
      }
      Meteor.users.update(docID, {
        $set: {
          privilege: data.privilege,
        },
      });
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update user account: ', error);
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

const updateMyEvents = 'MyEvents.update';

Meteor.methods({
  'MyEvents.update': function (userId, eventId, { user }, { event }) {
    check(userId, String);
    check(eventId, String);
    user.onGoingEvents.push(eventId);
    event.spotsFilled.push(userId);
    try {
      UserProfiles.update(userId, { onGoingEvents: user.onGoingEvents });
      Events.update(eventId, { spotsFilled: event.spotsFilled });
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update User and Event information ', error);
    }
  },
});

const deleteMyEvents = 'MyEvents.delete';

Meteor.methods({
  'MyEvents.delete': function (userId, eventId, { user }, { event }) {
    check(userId, String);
    check(eventId, String);
    const eventIndex = user.onGoingEvents.indexOf(eventId);
    user.onGoingEvents.splice(eventIndex, 1);
    const userIndex = event.spotsFilled.indexOf(userId);
    event.spotsFilled.splice(userIndex, 1);
    try {
      UserProfiles.update(userId, { onGoingEvents: user.onGoingEvents });
      Events.update(eventId, { spotsFilled: event.spotsFilled });
    } catch (error) {
      throw new Meteor.Error('removal-failed', 'Failed to unregister from event ', error);
    }
  },
});

// don't remove lines below, these methods are stored elsewhere.
// app/server/methods.js
const sendVerification = 'sendVerification';
const sendResetPasswordEmail_ = 'sendResetPasswordEmail_';

export {
  updateUserProfile, createUserProfile, removeUserProfile, updateEvent, createEvent, removeEvent, createSkill, removeSkill,
  createOrganization, updateOrganization, removeOrganization, loadDefaultCategories, createMainCategory, removeMainCategory,
  createSubcategory, updateSubcategory, removeSubcategory, updateMyEvents, updateUserAccount, sendVerification, sendResetPasswordEmail_, deleteMyEvents,
};
