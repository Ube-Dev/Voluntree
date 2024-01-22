import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
/* eslint-disable no-console */

// initialize the database with a default event document
function addEvent(event) {
  console.log(`  Adding: ${event.title}`);
  Events.define(event);
}

// initialize the EventsCollection if empty
if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default event.');
    Meteor.settings.defaultEvent.forEach(event => addEvent(event));
  }
}
