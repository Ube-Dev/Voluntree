import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import { addEventMethod } from '../both/Methods';
/* eslint-disable no-console */

// initialize the EventsCollection if empty
if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default event.');
    Meteor.settings.defaultEvent.forEach(({
      title,
      image,
      description,
      location,
      time,
      frequency,
      accessibilities,
      requirements,
      impact,
      eventPlanner,
      requiredSkills,
    }) => Meteor.call(addEventMethod, {
      title,
      image,
      description,
      location,
      time,
      frequency,
      accessibilities,
      requirements,
      impact,
      eventPlanner,
      requiredSkills,
    }));
  }
}
