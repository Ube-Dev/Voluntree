import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Notification_ } from './NotificationCollection';
import { generateID, isAOrganization_id, isAUser_id } from '../base/BaseUtilities';

Meteor.methods({ 'Notification_.define': function (data) {
  check(data, Object);
  // clean the document.
  Notification_._schema.clean(data);

  // validate if the users/organization exists
  data.receivers.forEach(userID => {
    if (!isAUser_id(userID)) {
      throw new Meteor.Error('sendNotification failed', `error: user ${userID} does not exists.This call will not be executed.`);
    }
    return null;
  });
  if (!(isAUser_id(data.sender) || isAOrganization_id(data.sender))) {
    throw new Meteor.Error('sendNotification failed', `error: sender ${data.sender} does not exists.This call will not be executed.`);
  }
  try {
    const id = data._id === undefined ? generateID : data._id;
    return Notification_._collection.insert({
      ...data,
      ...{ _id: id },
    });
  } catch (error) {
    throw new Meteor.Error('Notification_.define-failed', 'Failed to insert new notification.', error);
  }

} });
