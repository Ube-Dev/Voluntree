import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const notificationPublications = {
  user: 'notificationRelatedToUser',
  organization: 'notificationRelatedToOrganization',
};

const defaultSender = Meteor.settings.defaultNotificationSenderType;

class NotificationCollection extends BaseCollection {
  constructor() {
    super('notification', new SimpleSchema({
      notificationID: { type: String, index: true, unique: true },
      receivers: { type: Array }, // [userId]
      'receivers.$': { type: String },
      senderGroup: { type: String, defaultValue: defaultSender }, // option: ['USER', 'ORGANIZATION']
      sender: { type: String }, // userID/organizationID
      title: { type: String },
      content: { type: String }, // can be html
      createdDate: { type: Date, required: false, defaultValue: new Date() },
    }));
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for all users.
   */
  publish() {
    if (Meteor.isServer) {
      // get the MainCategory instance.
      const instance = this;
      /** This subscription publishes the entire mainCategory collection */
      Meteor.publish(notificationPublications.user, function publish(userID) {
        check(userID, String);
        if (this.userId) {
          const senderNotifications = instance._collection.find({ sender: userID });
          const receiverNotifications = instance._collection.find({ receivers: { $in: [userID] } });
          return [senderNotifications, receiverNotifications];
        }
        return this.ready();
      });
      Meteor.publish(notificationPublications.organization, function publish(organizationID) {
        check(organizationID, String);
        if (this.userId) {
          return instance._collection.find({ sender: organizationID });
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for notification sent/received by this user.
   * @param {String} userID userID of UserProfile.
   * @returns a subscription containing this userID as a receiver and sender, else null.
   */
  subscribeUserNotification(userID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(notificationPublications.user, userID);
    }
    return null;
  }

  /**
   * Subscription method for notification sent by this organization.
   * @param {String} organizationID of OrganizationProfile.
   * @returns a subscription containing this organizationID as a sender.
   */
  subscribeOrganizationNotification(organizationID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(notificationPublications.organization, organizationID);
    }
    return null;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Notification_ = new NotificationCollection();
