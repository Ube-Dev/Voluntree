import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Notification_ } from './NotificationCollection';
import { generateID, isAOrganization, isAUser } from '../base/BaseUtilities';

Meteor.methods({ 'Notification_.define': function (data) {
  check(data, Object);
  // clean the document.
  try {
    Notification_._schema.clean(data);
  } catch (error) {
    console.error(`"Notification_.define" Validation error: ${error.message}`);
    return null;
  }
  // validate if the users/organization exists
  data.receivers.forEach(userID => {
    if (!isAUser(userID)) {
      throw new Meteor.Error('sendNotification failed', `error: user ${userID} does not exists.This call will not be executed.`);
    }
    return null;
  });
  if (!(isAUser(data.sender) || isAOrganization(data.sender))) {
    throw new Meteor.Error('sendNotification failed', `error: sender ${data.sender} does not exists.This call will not be executed.`);
  }

  return Notification_._collection.insert({
    ...data,
    ...{ notificationID: generateID() },
  });
} });
