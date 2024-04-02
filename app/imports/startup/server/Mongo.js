import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import { createEvent, createOrganization, loadDefaultCategories } from '../both/Methods';
import { Organization } from '../../api/organization/OrganizationCollection';
import { MainCategory } from '../../api/category/MainCategoryCollection';
/* eslint-disable no-console */

if (MainCategory.count() === 0) {
  console.log('Creating default categories.');
  Meteor.call(loadDefaultCategories, Meteor.settings.defaultCategory, (error) => {
    if (error) {
      console.error(error);
    }
  });
}

if (Organization.count() === 0) {
  console.log('Creating default organization.');
  Meteor.settings.defaultOrganizations.forEach((data) => Meteor.call(createOrganization, data, (error) => {
    if (error) {
      console.error(error);
    }
  }));
}

// initialize the EventsCollection if empty
if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default event.');
    Meteor.settings.defaultEvent.forEach(data => Meteor.call(createEvent, data, (error) => {
      if (error) {
        console.error(error);
      }
    }));
  }
}
