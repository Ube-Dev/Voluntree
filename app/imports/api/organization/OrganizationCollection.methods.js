import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Organization } from './OrganizationCollection';

export const signUpNewUserMethod = new ValidatedMethod({
  name: 'Organization.SignupNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ organizationID, name, email, password }) {
    if (Meteor.isServer) {
      Organization.define({ organizationID, name, email, password });
    }
  },
});

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
