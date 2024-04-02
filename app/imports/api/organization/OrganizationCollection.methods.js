import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Organization } from './OrganizationCollection';
import { generateID, isAOrganization_id, isAUser_id, isEvent_id } from '../base/BaseUtilities';

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
    const entity = Organization._collection.findOne({ contactEmail: data.contactEmail, name: data.name });
    if (entity) {
      console.error('Organization already exists');
      throw new Meteor.Error('Organization already exists');
    }
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
      const ID = data._id === undefined ? generateID() : data._id;
      return Organization._collection.insert({
        ...data,
        ...{ _id: ID },
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
      if (data.leader && !isAUser_id(data.leader)) {
        console.error('User does not exists.');
        throw new Meteor.Error('update-failed-leader', `Leader with userID ${data.leader} does not exist.`);
      }

      if (data.pastEvents) {
        data.pastEvents.forEach(eventID => {
          if (!isEvent_id(eventID)) {
            console.error('Past event does not exists.');
            throw new Meteor.Error('update-failed-pastEvents', `Past event with eventID ${eventID} does not exist.`);
          }
        });
      }

      if (data.onGoingEvents) {
        data.onGoingEvents.forEach(eventID => {
          if (!isEvent_id(eventID)) {
            console.error('Ongoing event does not exists.');
            throw new Meteor.Error('update-failed-onGoingEvents', `On-going event with eventID ${eventID} does not exist.`);
          }
        });
      }

      if (data.members) {
        data.members.forEach(userID => {
          if (!isAUser_id(userID)) {
            console.error('User does not exists.');
            throw new Meteor.Error('update-failed-members', `Member with userID ${userID} does not exist.`);
          }
        });
      }

      // update
      Organization._collection.update(docID, { $set: data });
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
      if (isAOrganization_id(docID)) {
        console.error('Organization is not removed.(likely backend problem)');
        throw Meteor.error('remove-failed', 'Organization still in the database.');
      }
      return result;
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove organization: ', error);
    }
  },
});
