import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { UserProfiles } from '../user/UserProfileCollection';

const defaultOrganizationImage = Meteor.settings.defaultOrganizationImage;
const organizationType = Meteor.settings.environmentVariables.organizationTypes;
const organizationPublications = {
  organization: 'Organizations',
};

class OrganizationCollection extends BaseCollection {
  constructor() {
    super('Organizations', new SimpleSchema({
      leader: { type: String },
      organizationID: { type: String },
      name: { type: String },
      image: { type: String, optional: true, defaultValue: defaultOrganizationImage },
      location: { type: String, defaultValue: '' },
      mission: { type: String, defaultValue: '' },
      // contactInfo: { type: String, defaultValue: '' },
      type: { type: String, allowedValues: organizationType, optional: true },
      description: { type: String, optional: true, defaultValue: '' },
      phone: { type: String, optional: true, defaultValue: '' },
      email: { type: String, optional: true, defaultValue: '' },
      hasPhysicalAddress: { type: Boolean, optional: true, defaultValue: false },
      address: { type: String, optional: true, defaultValue: '' },
      zipCode: { type: String, optional: true, defaultValue: '' },
      city: { type: String, optional: true, defaultValue: '' },
      state: { type: String, optional: true, defaultValue: '' },
      country: { type: String, optional: true, defaultValue: '' },
      pastEvents: { type: Array, optional: true, defaultValue: [] },
      'pastEvents.$': { type: String },
      onGoingEvents: { type: Array, optional: true, defaultValue: [] },
      'onGoingEvents.$': { type: String },
      members: { type: Array, optional: true, defaultValue: [] },
      'members.$': { type: String },
    }));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param name The name of the organization.
   * @param image The image of the organization.
   * @param location The location of the organization.
   * @param mission The mission statement of the organization.
   * @param contactInfo The contact information of the organization.
   */
  define({ email, name, image, location, mission,
    type, description, phone, hasPhysicalAddress, address,
    zipCode, city, state, country, pastEvents, onGoingEvents,
    members,
  }) {
    const entity = this.findOne({ email, name });
    // adapted from: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    let credential = '';
    const maxPasswordLength = 30;
    const minPasswordLength = 6;
    const passwordLength = Math.floor(Math.random() * (maxPasswordLength - (minPasswordLength + 1))) + minPasswordLength;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < passwordLength; i++) {
      credential += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const organizationID = credential;
    if (entity) {
      return console.error('entity already exists.');
    }
    const id = UserProfiles.findOne({ email });
    if (!id) {
      return console.error('Please create a user account with this email first.');
    }
    const leaderID = id._id;
    return this._collection.insert({
      email, name, image, location, mission,
      type, description, phone, hasPhysicalAddress, address,
      zipCode, city, state, country, pastEvents, onGoingEvents,
      members, leader: leaderID, organizationID,
    });

  }

  /**
   * Updates the OrganizationProfile. You cannot change the email or role.
   * @param docID the id of the OrganizationProfile
   * @param name new name (optional)
   * @param image new image (optional)
   * @param location new location (optional)
   * @param mission new mission statement (optional)
   * @param contactInfo new contact information (optional)
   */
  update(docID, { email, name, image, location, mission,
    type, description, phone, hasPhysicalAddress, address,
    zipCode, city, state, country, pastEvents, onGoingEvents,
    members, leader,
  }) {
    this.assertDefined(docID);
    const updateData = {
      email, name, image, location, mission,
      type, description, phone, hasPhysicalAddress, address,
      zipCode, city, state, country, pastEvents, onGoingEvents,
      members, leader,
    };

    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
    this._collection.update(docID, { $set: updateData });
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
      Meteor.publish(organizationPublications.organization, function publish() {
        return instance._collection.find();
      });
    }
  }

  /**
   * Subscription method for event owned by the current user.
   */
  subscribeOrganization() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.organization);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOrganizationAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.organization);
    }
    return null;
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin, User or Organization.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin, User or Organization.
   */
  assertValidRoleForMethod() {
    return true;
  }

  // /**
  //  * Returns an array of strings, each one representing an integrity problem with this collection.
  //  * Returns an empty array if no problems were found.
  //  * Checks the profile common fields and the role..
  //  * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
  //  */
  // checkIntegrity() {
  //   const problems = [];
  //   this.find().forEach((doc) => {
  //     if (doc.role !== ROLE.ORGANIZATION) {
  //       problems.push(`OrganizationProfile instance does not have ROLE.ORGANIZATION: ${doc}`);
  //     }
  //   });
  //   return problems;
  // }

  // /**
  //  * Returns an object representing the OrganizationProfile docID in a format acceptable to define().
  //  * @param docID The docID of a OrganizationProfile
  //  * @returns { Object } An object representing the definition of docID.
  //  */
  // dumpOne(docID) {
  //   const doc = this.findDoc(docID);
  //   const email = doc.email;
  //   const name = doc.name;
  //   const image = doc.image;
  //   const location = doc.location;
  //   const mission = doc.mission;
  //   const contactInfo = doc.contactInfo;
  //   const password = doc.password;
  //   const role = doc.role;
  //   return { email, name, image, location, mission, contactInfo, password, role }; // CAM this is not enough for the define method. We lose the password.
  // }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {OrganizationProfileCollection}
 */
export const Organization = new OrganizationCollection();
