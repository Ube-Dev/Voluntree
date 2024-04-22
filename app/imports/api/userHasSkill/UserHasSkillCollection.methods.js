import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { UserHasSkills } from './UserHasSkillCollection';

Meteor.methods({
  'UserHasSkills.define': function (data) {
    check(data, Object);
    try {
      return UserHasSkills._collection.insert(data);
    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new skill: ', error);
    }
  },
});

Meteor.methods({
  'UserHasSkills.remove': function (data) {
    check(data, Object);
    try {
      return UserHasSkills._collection.remove(data);
    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new skill: ', error);
    }
  },
});
