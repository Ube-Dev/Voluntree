import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

class OrganizationProfileCollection extends BaseProfileCollection {
  constructor() {
    super('OrganizationProfile', new SimpleSchema({
      name: { type: String },
      image: { type: String },
      location: { type: String },
      mission: { type: String },
      contactInfo: { type: String },
      role: { type: String },
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
  define({ email, password, name, image, location, mission, contactInfo }) {
    const username = email;
    const user = this.findOne({ email, name });
    if (!user) {
      const role = ROLE.ORGANIZATION;
      const userID = Users.define({ username, role, password });
      return this._collection.insert({ email, name, image, location, mission, contactInfo, userID, role });
    }
    return user._id;
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
  update(docID, { name, image, location, mission, contactInfo }) {
    this.assertDefined(docID);
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (image) {
      updateData.image = image;
    }
    if (location) {
      updateData.location = location;
    }
    if (mission) {
      updateData.mission = mission;
    }
    if (contactInfo) {
      updateData.contactInfo = contactInfo;
    }
    this._collection.update(docID, { $set: updateData });
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
      if (doc.role !== ROLE.ORGANIZATION) {
        problems.push(`OrganizationProfile instance does not have ROLE.ORGANIZATION: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the OrganizationProfile docID in a format acceptable to define().
   * @param docID The docID of a OrganizationProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const name = doc.name;
    const image = doc.image;
    const location = doc.location;
    const mission = doc.mission;
    const contactInfo = doc.contactInfo;
    const password = doc.password;
    const role = doc.role;
    return { email, name, image, location, mission, contactInfo, password, role }; // CAM this is not enough for the define method. We lose the password.
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {OrganizationProfileCollection}
 */
export const OrganizationProfiles = new OrganizationProfileCollection();
