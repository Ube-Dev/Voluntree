import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
// import { UserProfiles } from '../user/UserProfileCollection';

export const eventPublications = {
  event: 'Event',
  eventAdmin: 'EventAdmin',
};

const defaultEventImage = Meteor.settings.defaultEventImage;

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      eventID: { type: String, unique: true, optional: true },
      title: { type: String, index: true },
      image: { type: String, optional: true, defaultValue: defaultEventImage },
      description: { type: String, optional: true, defaultValue: '' },
      location: { type: String, optional: true, defaultValue: '' },
      time: {
        type: Date,
        defaultValue: new Date(),
        optional: true,
      },
      frequency: { type: String, optional: true, defaultValue: 'Once' },
      accessibilities: { type: Array, unique: true, optional: true, defaultValue: [] },
      'accessibilities.$': { type: String },
      requiredSkills: { type: Array, optional: true, defaultValue: [] },
      'requiredSkills.$': { type: String },
      requirements: { type: Array, unique: true, optional: true, defaultValue: [] },
      'requirements.$': { type: String },
      impact: { type: String, optional: true, defaultValue: '' },
      hostType: { type: String, allowedValues: ['individual', 'organization', 'school'], optional: true, defaultValue: 'individual' },
      hostBy: { type: String, defaultValue: '' }, // organization/individual name
      hostID: { type: String, defaultValue: '' }, // organization/individual ID
      phone: { type: String, optional: true, defaultValue: '' },
      activityType: { type: String, allowedValues: ['remote', 'in-person', 'hybrid'], optional: true, defaultValue: 'in-person' },
      activityCategory: { type: String, optional: true, defaultValue: 'general' },
      address: { type: String, optional: true, defaultValue: '' },
      zipCode: { type: String, optional: true, defaultValue: '' },
      city: { type: String, optional: true, defaultValue: '' },
      state: { type: String, optional: true, defaultValue: '' },
      country: { type: String, optional: true, defaultValue: '' },
      totalSpots: { type: Number, optional: true, defaultValue: 1 },
      spotsFilled: { type: Array, optional: true, defaultValue: [] },
      'spotsFilled.$': { type: String },
      canceledVolunteer: { type: Array, optional: true, defaultValue: [] },
      'canceledVolunteer.$': { type: String },
      eventState: { type: String, allowedValues: ['ended', 'onGoing', 'canceled'], optional: true, defaultValue: 'onGoing' },
      recruiting: { type: Boolean, optional: true, defaultValue: true },
      equipments: { type: Object, optional: true },
      'equipments.key': { type: String },
      'equipments.value': { type: Array },
      'equipments.value.$': { type: String },
      equipmentsCount: { type: Object, optional: true },
      'equipmentsCount.key': { type: String }, // name of the equipment
      'equipmentsCount.value': { type: Object }, // a dictionary of different specification for each equipment
      'equipmentsCount.value.key': { type: String }, // name of the specificaiton
      'equipmentsCount.value.value': { type: Number }, // total numbers
      startTime: { type: Date, optional: true, defaultValue: new Date() },
      endTime: { type: Date, optional: true, defaultValue: new Date() },
    }));
  }

  /**
   * Defines a new Event item.
   * @param Object See database diagram for specifics.
   * @return {String} the docID of the new document.
   */
  define({ title, image, description, location, time, frequency, accessibilities, requirements, impact,
    requiredSkills, hostType, hostBy, phone, activityType, activityCategory, address, zipCode, city, state,
    country, totalSpots, spotsFilled, eventState, recruiting, equipments, equipmentsCount, canceledVolunteer,
    hostID, startTime, endTime,
  }) {
    // adapted from: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    // generate eventID
    let credential = '';
    const maxPasswordLength = 30;
    const minPasswordLength = 6;
    const passwordLength = Math.floor(Math.random() * (maxPasswordLength - (minPasswordLength + 1))) + minPasswordLength;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < passwordLength; i++) {
      credential += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    // insert new event entity
    const docID = this._collection.insert({
      title, image, description, location, time, frequency,
      accessibilities, hostID,
      requirements,
      impact, eventID: credential, requiredSkills, hostType, hostBy, phone, activityType, activityCategory, address,
      zipCode, city, state, country, totalSpots, spotsFilled, eventState, recruiting, equipments,
      equipmentsCount, canceledVolunteer, startTime, endTime,
    });

    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param Object See database diagram for specifics.
   */
  update(docID, { title, image, description, location, time, frequency, accessibilities, requirements, impact,
    requiredSkills, hostType, hostBy, phone, activityType, activityCategory, address, zipCode, city, state,
    country, totalSpots, spotsFilled, eventState, recruiting, equipments, equipmentsCount, canceledVolunteer,
    startTime, endTime,
  }) {
    const updateData = { title, image, description, location, time, frequency, accessibilities, requirements, impact,
      requiredSkills, hostType, hostBy, phone, activityType, activityCategory, address, zipCode, city, state,
      country, totalSpots, spotsFilled, eventState, recruiting, equipments, equipmentsCount, canceledVolunteer,
      startTime, endTime,
    };
    // Map non undefined values to keys then insert.
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
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
      Meteor.publish(eventPublications.event, function publish() {
        return instance._collection.find();
      });
    }
  }

  /**
   * Subscription method for event owned by the current user.
   */
  subscribeEvent() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.event);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeEventAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.eventAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const title = doc.title;
    const image = doc.image;
    const description = doc.description;
    const location = doc.location;
    const time = doc.time;
    const frequency = doc.frequency;
    const accessibilities = doc.accessibilities;
    const requirements = doc.requirements;
    const impact = doc.impact;
    const eventPlanner = doc.eventPlanner;
    return { title, image, description, location, time, frequency, accessibilities, requirements, impact, eventPlanner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();
