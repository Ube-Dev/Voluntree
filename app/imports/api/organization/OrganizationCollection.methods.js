import { Meteor } from 'meteor/meteor';
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
