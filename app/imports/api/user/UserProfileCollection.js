import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';

const defaultProfileImage = Meteor.settings.defaultProfileImage;

export const userPublications = {
  user: 'User',
  singleUser: 'singleUser',
  userAdmin: 'Admin',
};

class UserProfileCollection extends BaseProfileCollection {
  constructor() {
    super('UserProfile', new SimpleSchema({
      firstName: { type: String },
      lastName: { type: String },
      image: { type: String, optional: true, defaultValue: defaultProfileImage },
      phone: { type: String, optional: true, defaultValue: '' },
      bookmarks: { type: Array, optional: true, defaultValue: [] },
      'bookmarks.$': { type: String }, // eventId
      viewingHistory: { type: Array, optional: true, defaultValue: [] },
      'viewingHistory.$': { type: String }, // eventId
      pastEvents: { type: Array, optional: true, defaultValue: [] }, // eventId, past event user has participated in.
      'pastEvents.$': { type: String },
      onGoingEvents: { type: Array, optional: true, defaultValue: [] },
      'onGoingEvents.$': { type: String }, // eventId
      userActivity: { type: Array, optional: true, defaultValue: [] },
      'userActivity.$': { type: Object },
      'userActivity.$.eventId': { type: String },
      'userActivity.$.activity': { type: String },
      'userActivity.$.timestamp': { type: Date },
      totalHours: { type: Number, optional: true, defaultValue: 0 },
      address: { type: String, optional: true, defaultValue: '' },
      zipCode: { type: String, optional: true, defaultValue: '' },
      city: { type: String, optional: true, defaultValue: '' },
      state: { type: String, optional: true, defaultValue: '' },
      country: { type: String, optional: true, defaultValue: '' },
      feedbacks: { type: Array, optional: true, defaultValue: [] },
      'feedbacks.$': { type: Object },
      'feedbacks.$.reviewer': { type: String }, // reviewer userId
      'feedbacks.$.review': { type: String },
      skills: { type: Array, optional: true, defaultValue: [] },
      'skills.$': { type: String },
      followers: { type: Array, optional: true, defaultValue: [] },
      'followers.$': { type: String },
      organizationFollowed: { type: Array, optional: true, defaultValue: [] },
      'organizationFollowed.$': { type: String },
      memberOf: { type: Array, optional: true, defaultValue: [] },
      'memberOf.$': { type: String },
    }));
  }

  define(data) {
    return Meteor.call('UserProfiles.define', data);
  }

  /**
   *
   * @param {String} userID Takes in a single userID.
   * @returns A subscription, or NULL when not a client.
   */
  subscribeSingleUser(userID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.singleUser, userID);
    }
    return null;
  }

  /**
    * Default publication method for entities.
    * It publishes the entire collection for all users.
    */
  publish() {
    if (Meteor.isServer) {
      // get the EventCollection instance.
      const instance = this;
      // this subscription publishes the entire collection
      Meteor.publish(userPublications.user, function publish() {
        return instance._collection.find();
      });
      Meteor.publish(userPublications.singleUser, function publish(userID) {
        check(userID, String);
        // console.log(instance._collection.find({ userID: userID }).fetch());
        return instance._collection.find({ userID: userID });
      });
    }
  }

  /**
   * Subscription method for event owned by the current user.
   */
  subscribeUser() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.user);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeUserAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.userAdmin);
    }
    return null;
  }

  /**
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod() {
    // this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
    return true;
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.User) {
        problems.push(`UserProfile instance does not have ROLE.USER: ${doc}`);
      }
    });
    return problems;
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {UserProfileCollection}
 */
export const UserProfiles = new UserProfileCollection();
