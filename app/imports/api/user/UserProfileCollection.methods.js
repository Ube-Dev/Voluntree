import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { UserProfiles } from './UserProfileCollection';

export const signUpNewUserMethod = new ValidatedMethod({
  name: 'UserProfiles.SignupNewUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, firstName, lastName, password }) {
    if (Meteor.isServer) {
      UserProfiles.define({ email, firstName, lastName, password });
    }
  },
});

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


Meteor.methods({
  'UserProfiles.update': function (docID, data) {
    check(docID, String);
    check(data, Object);
    try {
      UserProfiles.update(docID, data);
    } catch (error) {
      // Handle or log the error here
      throw new Meteor.Error('update-failed', 'Failed to update user profile: ', error);
    }
  },
});

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


