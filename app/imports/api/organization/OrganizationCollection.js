import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

const defaultOrganizationImage = Meteor.settings.defaultOrganizationImage;
const organizationType = Meteor.settings.organizationType;
const organizationPublications = {
  organization: 'Organizations',
  singleOrganization: 'singleOrganization',
};

class OrganizationCollection extends BaseCollection {
  constructor() {
    super('Organizations', new SimpleSchema({
      leader: { type: String },
      organizationID: { type: String, optional: true },
      name: { type: String },
      image: { type: String, optional: true, defaultValue: defaultOrganizationImage },
      mission: { type: String, defaultValue: '' },
      type: { type: String, allowedValues: organizationType, optional: true },
      phone: { type: String, optional: true, defaultValue: '' },
      contactEmail: { type: String, optional: true, defaultValue: '' },
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
      TotalHours: { type: Number, optional: true, defaultValue: 0 },
      MonthlyHours: { type: Number, optional: true, defaultValue: 0 },
      averageRating: { type: Number, optional: true },
    }));
  }

  /**
   *
   * @param {String} organizationID Takes in a single organizationID.
   * @returns A subscription, or NULL when not a client.
   */
  subscribeSingleOrganization(organizationID) {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.singleOrganization, organizationID);
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
      Meteor.publish(organizationPublications.organization, function publish() {
        return instance._collection.find();
      });
      Meteor.publish(organizationPublications.singleOrganization, function publish(docID) {
        check(docID, String);
        return instance._collection.find({ _id: docID });
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
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin, User or Organization.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin, User or Organization.
   */
  assertValidRoleForMethod() {
    return true;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {OrganizationCollection}
 */
export const Organization = new OrganizationCollection();
