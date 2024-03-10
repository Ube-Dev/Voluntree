import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from '../../api/event/EventCollection';

Meteor.methods({
    'Events.define': function (data) {
      check(data, Object);
      try {
        return Events.define(data);
      } catch (error) {
        throw new Meteor.Error('create-failed', 'Failed to add new event: ', error);
      }
    },
  });

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

  
