import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Organization } from './OrganizationCollection';
import { generateID, isAOrganization, isAUser, isEvent } from '../base/BaseUtilities';

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
    // const entity = Organization._collection.findOne({ contactEmail: data.contactEmail, name: data.name });
    // if (entity) {
    //   throw new Meteor.Error('Organization already exists');
    // }
    try {
      // if (data.leader && !isAUser(data.leader)) {
      //   throw new Meteor.Error('create-failed-leader', `Leader with userID ${data.leader} does not exist.`);
      // }

      // if (data.pastEvents) {
      //   data.pastEvents.forEach(eventID => {
      //     if (!isEvent(eventID)) {
      //       throw new Meteor.Error('create-failed-pastEvents', `Past event with eventID ${eventID} does not exist.`);
      //     }
      //   });
      // }

      // if (data.onGoingEvents) {
      //   data.onGoingEvents.forEach(eventID => {
      //     if (!isEvent(eventID)) {
      //       throw new Meteor.Error('create-failed-onGoingEvents', `On-going event with eventID ${eventID} does not exist.`);
      //     }
      //   });
      // }

      // if (data.members) {
      //   data.members.forEach(userID => {
      //     if (!isAUser(userID)) {
      //       throw new Meteor.Error('create-failed-members', `Member with userID ${userID} does not exist.`);
      //     }
      //   });
      // }

      const ID = data.organizationID === undefined ? generateID() : data.organizationID;
      return Organization._collection.define({
        ...data,
        ...{ organizationID: ID },
      });

    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new organization:', error);
    }
  },
});

Meteor.methods({
  'Organization.update': function (docID, data) {
    check(data, Object);
    check(docID, String);
    try {
      // validate by searching through the collection
      if (data.leader && !isAUser(data.leader)) {
        throw new Meteor.Error('update-failed-leader', `Leader with userID ${data.leader} does not exist.`);
      }

      if (data.pastEvents) {
        data.pastEvents.forEach(eventID => {
          if (!isEvent(eventID)) {
            throw new Meteor.Error('update-failed-pastEvents', `Past event with eventID ${eventID} does not exist.`);
          }
        });
      }

      if (data.onGoingEvents) {
        data.onGoingEvents.forEach(eventID => {
          if (!isEvent(eventID)) {
            throw new Meteor.Error('update-failed-onGoingEvents', `On-going event with eventID ${eventID} does not exist.`);
          }
        });
      }

      if (data.members) {
        data.members.forEach(userID => {
          if (!isAUser(userID)) {
            throw new Meteor.Error('update-failed-members', `Member with userID ${userID} does not exist.`);
          }
        });
      }

      // update
      Organization._collection.update(docID, data);
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update organization: ', error);
    }
  },
});

Meteor.methods({
  'Organization.remove': function (docID) {
    check(docID, String);
    try {
      const result = Organization._collection.remove(docID);
      if (isAOrganization(docID)) {
        throw Meteor.error('remove-failed', 'Organization still in the database.');
      }
      return result;
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove organization: ', error);
    }
  },
});
