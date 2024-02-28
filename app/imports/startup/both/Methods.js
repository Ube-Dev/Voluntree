import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Events } from '../../api/event/EventCollection';
import { Skills } from '../../api/skill/SkillCollection';
import { Organization } from '../../api/organization/OrganizationCollection';

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
      UserProfiles.update(docID, { $set: updateData });
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

export {
  updateUserProfile, createUserProfile, removeUserProfile, updateEvent, createEvent, removeEvent, createSkill, removeSkill,
  createOrganization, updateOrganization, removeOrganization,
};
