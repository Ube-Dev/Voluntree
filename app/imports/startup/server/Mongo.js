import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import { createEvent, createOrganization, loadDefaultCategories } from '../both/Methods';
import { Organization } from '../../api/organization/OrganizationCollection';
import { MainCategory } from '../../api/category/MainCategoryCollection';
/* eslint-disable no-console */

if (MainCategory.count() === 0) {
  console.log('Creating default categories.');
  Meteor.call(loadDefaultCategories, Meteor.settings.defaultCategory);
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

// initialize the EventsCollection if empty
if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default event.');
    Meteor.settings.defaultEvent.forEach(data => Meteor.call(createEvent, data));
  }
}
