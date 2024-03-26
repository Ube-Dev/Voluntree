import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Skills } from './SkillCollection';

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
