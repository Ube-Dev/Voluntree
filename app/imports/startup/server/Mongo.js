import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import { createComment, createEvent, createOrganization, createReview, loadDefaultCategories, createUserHasSkill } from '../both/Methods';
import { Organization } from '../../api/organization/OrganizationCollection';
import { MainCategory } from '../../api/category/MainCategoryCollection';
import { Review } from '../../api/review/ReviewCollection';
import { Comment } from '../../api/comment/CommentCollection';
import { UserHasSkills } from '../../api/userHasSkill/UserHasSkillCollection';
/* eslint-disable no-console */

if (MainCategory.count() === 0) {
  console.log('Creating default categories.');
  Meteor.call(loadDefaultCategories, Meteor.settings.defaultCategory, (error) => {
    if (error) {
      console.error(error);
    }
  });
}

if (Organization.count() === 0) {
  console.log('Creating default organization.');
  Meteor.settings.defaultOrganizations.forEach((data) => Meteor.call(createOrganization, data, (error) => {
    if (error) {
      console.error(error);
    }
  }));
}

// initialize the EventsCollection if empty
if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default event.');
    Meteor.settings.defaultEvent.forEach(data => Meteor.call(createEvent, data, (error) => {
      if (error) {
        console.error(error);
      }
    }));
  }
}

if (Review.count() === 0) {
  if (Meteor.settings.defaultReview) {
    console.log('Creating default reviews.', Meteor.settings.defaultReview);
    Meteor.settings.defaultReview.forEach(data => Meteor.call(createReview, data, (error) => {
      if (error) {
        console.error(error);
      }
    }));
  }
}

if (Comment.count() === 0) {
  if (Meteor.settings.defaultComment) {
    console.log('Creating default comments.', Meteor.settings.defaultComment);
    Meteor.settings.defaultComment.forEach(data => Meteor.call(createUserHasSkill, data, (error) => {
      if (error) {
        console.error(error);
      }
    }));
  }
}

if (UserHasSkills.count() === 0) {
  if (Meteor.settings.defaultUserSkills) {
    console.log('Creating default userSkills.', Meteor.settings.defaultUserSkills);
    Meteor.settings.defaultUserSkills.forEach(data => Meteor.call(createComment, data, (error) => {
      if (error) {
        console.error(error);
      }
    }));
  }
}
