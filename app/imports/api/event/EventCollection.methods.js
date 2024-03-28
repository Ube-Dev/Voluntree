import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from './EventCollection';
import { generateID, isAOrganization, isAUser, isEvent, validMainCategory, validSubCategory } from '../base/BaseUtilities';

Meteor.methods({
  'Events.define': function (data) {
    check(data, Object);

    try {
      Events._schema.clean(data);

    } catch (error) {
      throw new Meteor.Error('create-failed', 'Invalid new event: ', error);
    }
    console.log(data.activityCategory.mainCategory);
    try {
      // check for valid activityCategory
      if (!(validMainCategory(data.activityCategory.mainCategory) && validSubCategory(data.activityCategory.subCategory))) {
        throw Meteor.Error('Create Event Failed: Invalid Category.');
      }
      console.log('middle2');
      console.log(data.hostID);
      // check if hostID is organization/individual
      if (!(isAOrganization(data.hostID) || isAUser(data.hostID))) {
        console.error('Events.define failed:', 'hostID not found');
        throw Meteor.Error('Create Event Failed: This host does not exists');
      }
      console.log('passes');

      const id = data.EventID === undefined ? generateID() : data.EventID;
      return Events._collection.insert({
        ...data,
        ...{ EventID: id },
      });
    } catch (error) {
      throw Meteor.Error('Events.define failed', 'Unable to create new event.');
    }
  },
});

Meteor.methods({
  'Events.update': function (docID, data) {
    check(docID, String);
    check(data, Object);
    if (!isEvent(docID)) {
      throw Meteor.Error('Events.update failed,'`Unable to find event ${docID}`);
    }
    if (data.activityCategory) {
      if (!(validMainCategory(data.activityCategory.mainCategory) && validSubCategory(data.activityCategory.subCategory))) {
        throw Meteor.Error('Create Event Failed: Invalid Category.');
      }
    }
    try {
      Events._collection.update(docID, data);
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update event: ', error);
    }
  },
});

Meteor.methods({
  'Events.remove': function (docID) {
    check(docID, String);
    try {
      Events._collection.remove(docID);
      return Events._collection.findOne(docID) === null;
    } catch (error) {
      throw new Meteor.Error('delete-failed', 'Failed to delete event: ', error);
    }
  },
});
