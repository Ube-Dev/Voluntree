import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import { createEvent, createOrganization } from '../both/Methods';
import { Organization } from '../../api/organization/OrganizationCollection';
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
    }) => Meteor.call(createEvent, {
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

if (Organization.count() === 0) {
  console.log('Creating default organization.');
  Meteor.settings.defaultOrganizations.forEach(({
    email, name, image, location, mission,
    type, description, phone, hasPhysicalAddress, address,
    zipCode, city, state, country, pastEvents, onGoingEvents,
    members, leader, organizationID,
  }) => Meteor.call(createOrganization, {
    email, name, image, location, mission,
    type, description, phone, hasPhysicalAddress, address,
    zipCode, city, state, country, pastEvents, onGoingEvents,
    members, leader, organizationID,
  }));
}
