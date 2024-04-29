import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
// import { MainCategory } from '../../api/category/MainCategoryCollection';
// import { SubCategory } from '../../api/category/SubCategoryCollection';
import { ROLE } from '../../api/role/Role';

// app\imports\api\user\UserProfileCollection.methods.js
const createUserProfile = 'UserProfiles.define';
const updateUserProfile = 'UserProfiles.update';
const removeUserProfile = 'UserProfiles.remove';
const userAddHours = 'UserProfiles.AddHours';

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
const organizationAddHours = 'Organization.AddHours';

// app\imports\api\category\CategoryCollection.methods.js
const createMainCategory = 'MainCategory.define';
const removeMainCategory = 'MainCategory.remove';
const createSubcategory = 'Subcategory.define';
const updateSubcategory = 'Subcategory.update';
const removeSubcategory = 'Subcategory.remove';

// app\imports\api\review\Review.methods.js
const createReview = 'Review.define';
const removeReview = 'Review.remove';
const updateReview = 'Review.update';

// app\imports\api\comment\Comment.methods.js
const createComment = 'Comment.define';
const removeComment = 'Comment.remove';
const udpateComment = 'Comment.update';

// app\imports\api\notification\Notification.method.js
const sendNotification = 'Notification_.define';

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
        // Insert a main category.
        Meteor.call(createMainCategory, { category: mainCategory });

        // Iterate over each subcategory in the array.
        subCategories.forEach(subCategory => {
          // Insert the subcategory with its parent category into the collection.
          Meteor.call(createSubcategory, { category: subCategory, parentCategory: mainCategory });
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
      // userId and eventId is _id, update takes _id by default
      // UserProfiles.update(userId, { onGoingEvents: user.onGoingEvents });
      Meteor.call(updateUserProfile, userId, { onGoingEvents: user.onGoingEvents }, (error) => {
        if (error) {
          console.log('updateUserProfile error:', error);
          throw new Meteor.Error('MyEvents.update failed', 'updateUserProfile error');
        }
      });

      // Events.update(eventId, { spotsFilled: event.spotsFilled });
      Meteor.call(updateEvent, eventId, { spotsFilled: event.spotsFilled }, (error) => {
        if (error) {
          console.log('error:', error);
          throw new Meteor.Error('MyEvents.update failed', 'updateEvent error');
        }
      });
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
      // userId and eventId is _id, update takes _id by default
      // UserProfiles.update(userId, { onGoingEvents: user.onGoingEvents });
      Meteor.call(updateUserProfile, userId, { onGoingEvents: user.onGoingEvents }, (error) => {
        if (error) {
          console.log('updateUserProfile error:', error);
          throw new Meteor.Error('MyEvents.update failed', 'updateUserProfile error');
        }
      });

      // Events.update(eventId, { spotsFilled: event.spotsFilled });
      Meteor.call(updateEvent, eventId, { spotsFilled: event.spotsFilled }, (error) => {
        if (error) {
          console.log('error:', error);
          throw new Meteor.Error('MyEvents.update failed', 'updateEvent error');
        }
      });
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
  sendNotification, userAddHours, createReview, updateReview, removeReview, organizationAddHours, createComment, removeComment, udpateComment,
};
