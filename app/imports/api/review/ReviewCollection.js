import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const reviewPublications = {
  user: 'reviewRelatedToUser',
  organization: 'reviewRelatedToOrganization',
  event: 'reviewRelatedToEvent',
};

const defaultReviewForType = Meteor.settings.defaultReviewForType;
const defaultRatingRange = Meteor.settings.defaultRatingRange;

class ReviewCollection extends BaseCollection {
  constructor() {
    super('review', new SimpleSchema({
      rating: { type: Number, min: defaultRatingRange.min, max: defaultRatingRange.max },
      reviewerID: { type: String }, // userID
      reviewFor: { type: Object },
      'reviewFor.type': { type: String, allowedValues: Object.values(defaultReviewForType) }, // ["event", "organization"]
      'reviewFor.ID': { type: String }, // eventID/organizationID
      content: { type: String },
    }));
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for all users.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      // find and return cursor for reviewerID == userID in this collection.
      Meteor.publish(reviewPublications.user, function publish(userID) {
        check(userID, String);
        if (this.userId) {
          return instance._collection.find({ reviewerID: userID });
        }
        return this.ready();
      });
      // find and return cursor for reviewFor with this eventID in this collection.
      Meteor.publish(reviewPublications.event, function publish(eventID) {
        check(eventID, String);
        if (this.userId) {
          return instance._collection.find({ reviewFor: { type: defaultReviewForType.event, ID: eventID } });
        }
        return this.ready();
      });
      // find and return cursor for reviewFor with this organizationID in this collection.
      Meteor.publish(reviewPublications.organization, function publish(organizationID) {
        check(organizationID, String);
        if (this.userId) {
          return instance._collection.find({ reviewFor: { type: defaultReviewForType.organization, ID: organizationID } });
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for reviews written by this user.
   * @param {String} userID userID of UserProfile.
   * @returns a subscription containing reviews entities, else null.
   */
  subscribeReviewUser(userID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(reviewPublications.user, userID);
    }
    return null;
  }

  /**
   * Subscription method for reviews for this organization.
   * @param {String} organizationID of OrganizationProfile.
   * @returns a subscription containing reviews entities, else null.
   */
  subscribeReviewOrganization(organizationID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(reviewPublications.organization, organizationID);
    }
    return null;
  }

  /**
   * Subscription method for reviews for this event.
   * @param {String} _id of Events.
   * @returns a subscription containing reviews entities, else null.
   */
  subscribeReviewEvent(eventID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(reviewPublications.event, eventID);
    }
    return null;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Review = new ReviewCollection();
