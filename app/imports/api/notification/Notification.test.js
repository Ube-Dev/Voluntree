// not done
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { Notification_ } from './NotificationCollection';
import { generateID } from '../base/BaseUtilities';

if (Meteor.isClient) {

  describe('Notification Collection', function () {
    beforeEach(function () {
      Notification_._collection.remove({});
    });

    it('defines a notification', function () {
      const data = {
        notificationID: generateID(),
        receivers: ['user1', 'user2'],
        senderGroup: 'USER',
        sender: 'user3',
        title: 'Test Notification',
        content: 'This is a test notification.',
        createdDate: new Date(),
      };
      const notificationID = Notification_.define(data);
      assert.isDefined(notificationID);
    });

    it('publishes notifications related to user', function () {
      const userID = 'user1';
      const subscription = Notification_.subscribeUserNotification(userID);
      assert.isNotNull(subscription);
    // Add assertions to test the published data
    });

    it('publishes notifications related to organization', function () {
      const organizationID = 'organization1';
      const subscription = Notification_.subscribeOrganizationNotification(organizationID);
      assert.isNotNull(subscription);
    // Add assertions to test the published data
    });
  });

}
