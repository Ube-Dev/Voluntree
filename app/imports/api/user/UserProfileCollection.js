import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

const defaultProfileImage = Meteor.settings.defaultProfileImage;

export const userPublications = {
  user: 'User',
  userAdmin: 'Admin',
};
/**
 * The UserProfileCollection class represents a collection of user profiles in the system.
 * It provides methods for defining, updating, and managing user profiles, as well as publishing
 * and subscribing to user profile data for regular users and administrators(to be implenmented).
 * This class extends the BaseProfileCollection and inherits its functionality for basic profile operations.
 *
 * The schema defines the structure of user profiles in the collection, including fields such as
 * first name, last name, image URL, phone number, bookmarks, viewing history, past events,
 * ongoing events, user activity, total hours, address, zip code, city, state, country,
 * feedbacks, skills, followers, organization followed, member of, and privilege.
 * Open this class file to check the field types or see the db diagram.
 */
class UserProfileCollection extends BaseProfileCollection {
  /**
    * Constructs a new UserProfileCollection with the specified collection name and schema.
    * The schema defines the structure of user profiles in the collection, including fields such as
    * first name, last name, image URL, phone number, bookmarks, viewing history, past events,
    * ongoing events, user activity, total hours, address, zip code, city, state, country,
    * feedbacks, skills, followers, organization followed, member of, and privilege.
    */
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
      privilege: { type: Array, optional: true, defaultValue: [] },
      'privilege.$': { type: String },
    }));
  }

  /**
   * Defines a new user profile.
   * @param {Object} data - The data for user profile creation.
   * @returns {string} - The ID of the created profile.
   */
  define({ email, firstName, lastName, password, image, phone, bookmarks,
    viewingHistory, pastEvents, onGoingEvents, userActivity,
    totalHours, address, zipCode, city, state, country, feedbacks, skills,
    followers, organizationFollowed, memberOf, userID, privilege,
  }) {
    const username = email;
    const user = this.findOne({ email, firstName, lastName });
    if (!user) {
      const role = ROLE.USER;
      let newID = Users.define({ username, role, privilege, password });
      if (userID) {
        newID = userID;
      }
      return this._collection.insert({
        email, firstName, lastName, userID: newID, role,
        image, phone, bookmarks,
        viewingHistory, pastEvents, onGoingEvents, userActivity,
        totalHours, address, zipCode, city, state, country, feedbacks, skills,
        followers, organizationFollowed, memberOf, privilege,
      });
    }
    return user._id;
  }

  /**
   * Updates an existing user profile.
   * @param {string} docID - The ID of the profile to update.
   * @param {Object} data - The data to update the profile with.
   */
  update(docID, { firstName, lastName, image, phone, bookmarks,
    viewingHistory, pastEvents, onGoingEvents, userActivity,
    totalHours, address, zipCode, city, state, country, feedbacks, skills,
    followers, organizationFollowed, memberOf,
  }) {
    this.assertDefined(docID);
    const updateData = {
      firstName, lastName, image, phone, bookmarks,
      viewingHistory, pastEvents, onGoingEvents, userActivity,
      totalHours, address, zipCode, city, state, country, feedbacks, skills,
      followers, organizationFollowed, memberOf,
    };
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
    this._collection.update(docID, { $set: updateData });
  }

  /**
 * Removes a user profile and associated user account.
 * @param {string} profileID - The ID of the user profile to remove.
 * @returns {string|null} - The ID of the removed user profile, or null if it doesn't exist.
 */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
  * Publishes user profiles to clients.
  */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      // this subscription publishes the entire collection
      Meteor.publish(userPublications.user, function publish() {
        return instance._collection.find();
      });
    }
  }

  /**
 * Subscribes to user profiles for regular users.
 * @returns {object|null} - The subscription handle if on the client, or null otherwise.
 */
  subscribeUser() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.user);
    }
    return null;
  }

  /**
 * Subscribes to user profiles for admin users.
 * @returns {object|null} - The subscription handle if on the client, or null otherwise.
 */
  subscribeUserAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.userAdmin);
    }
    return null;
  }

  /**
 * Checks the integrity of user profiles.
 * @returns {Array} - An array of strings indicating integrity issues, if any.
 */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.USER) {
        problems.push(`UserProfile instance does not have ROLE.USER: ${doc}`);
      }
    });
    return problems;
  }

  /**
 * Retrieves data from a user profile for exporting.
 * @param {string} docID - The ID of the user profile to extract data from.
 * @returns {Object} - An object representing the extracted user profile data.
 */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const totalHours = doc.totalHours;
    return { email, firstName, lastName, totalHours }; // CAM this is not enough for the define method. We lose the password.
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {UserProfileCollection}
 */
export const UserProfiles = new UserProfileCollection();
