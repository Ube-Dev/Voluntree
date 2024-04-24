import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const commentPublications = {
  user: 'commentRelatedToUser',
  organization: 'commentRelatedToOrganization',
  event: 'commentRelatedToEvent',
};

// eslint-disable-next-line no-unused-vars
const defaultCommentForType = Meteor.settings.defaultCommentForType;

class CommentCollection extends BaseCollection {
  constructor() {
    super('comment', new SimpleSchema({
      userID: { type: String }, // userID
      commentFor: { type: Object },
      'commentFor.type': { type: String, allowedValues: ['event', 'organization'] }, // ["event", "organization"]
      'commentFor.ID': { type: String }, // eventID/organizationID
      content: { type: String },
      parentID: { type: String, optional: true },
    }));
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for all users.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      // find and return cursor for commenterID/userID in this collection.
      Meteor.publish(commentPublications.user, function publish(userID) {
        check(userID, String);
        if (this.userId) {
          return instance._collection.find({ userID: userID });
        }
        return this.ready();
      });
      // find and return cursor for commentFor with this eventID in this collection.
      Meteor.publish(commentPublications.event, function publish(eventID) {
        check(eventID, String);
        if (this.userId) {
          return instance._collection.find({ commentFor: { type: 'event', ID: eventID } });
        }
        return this.ready();
      });
      // find and return cursor for commentFor with this organizationID in this collection.
      Meteor.publish(commentPublications.organization, function publish(organizationID) {
        check(organizationID, String);
        if (this.userId) {
          return instance._collection.find({ commentFor: { type: 'organization', ID: organizationID } });
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for comments written by this user.
   * @param {String} userID userID of UserProfile.
   * @returns a subscription containing comments entities, else null.
   */
  subscribeCommentUser(userID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(commentPublications.user, userID);
    }
    return null;
  }

  /**
   * Subscription method for comments for this organization.
   * @param {String} organizationID of OrganizationProfile.
   * @returns a subscription containing comments entities, else null.
   */
  subscribeCommentOrganization(organizationID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(commentPublications.organization, organizationID);
    }
    return null;
  }

  /**
   * Subscription method for comments for this event.
   * @param {String} _id of Events.
   * @returns a subscription containing comments entities, else null.
   */
  subscribeCommentEvent(eventID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(commentPublications.event, eventID);
    }
    return null;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Comment = new CommentCollection();
