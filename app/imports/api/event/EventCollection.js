import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventPublications = {
  event: 'Event',
  eventAdmin: 'EventAdmin',
};

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      eventId: { type: Number, optional: true },
      title: { type: String, index: true },
      image: { type: String, optional: true },
      description: { type: String, optional: true },
      location: { type: String, optional: true },
      time: {
        type: Date,
        defaultValue: new Date(),
        optional: true,
      },
      frequency: { type: String, optional: true },
      accessibilities: { type: Array, unique: true, optional: true },
      'accessibilities.$': { type: String },
      requiredSkills: { type: Array, optional: true },
      'requiredSkills.$': { type: String },
      requirements: { type: Array, unique: true, optional: true },
      'requirements.$': { type: String },
      impact: { type: String, optional: true },
      hostType: { type: String, allowedValues: ['individual', 'organization', 'school', 'community'], optional: true },
      phone: { type: Number, optional: true },
      activityType: { type: String, allowedValues: ['remote', 'in-person', 'hybrid'], optional: true },
      address: { type: String, optional: true },
      zipCode: { type: String, optional: true },
      city: { type: String, optional: true },
      state: { type: String, optional: true },
      country: { type: String, optional: true },
      totalSpots: { type: Number, optional: true },
      spotsFilled: { type: Array, optional: true },
      'spotsFilled.$': { type: Number },
      eventState: { type: String, allowedValues: ['ended', 'onGoing', 'canceled'], optional: true },
      recruiting: { type: Boolean, optional: true },
      equipments: { type: Object, optional: true },
      'equipments.key': { type: String },
      'equipments.value': { type: Array },
      'equipments.value.$': { type: String },
      equipmentsCount: { type: Object, optional: true },
      'equipmentsCount.key': { type: String }, // name of the equipment
      'equipmentsCount.value': { type: Object }, // a dictionary of different specification for each equipment
      'equipmentsCount.value.key': { type: String }, // name of the specificaiton
      'equipmentsCount.value.value': { type: Number }, // total numbers
    }));
  }

  /**
   * Defines a new Event item.
   * @param title the title of the event
   * @param image the link to the image of the event
   * @param description the description of the event
   * @param location the location of the event
   * @param time the time of the event
   * @param frequency the frequency of the event
   * @param accessibilities how accessible the event is (can be a string or an array of strings)
   * @param requirements what is required for the event (can be a string or an array of strings)
   * @param impact the impact of the event
   * @param eventPlanner the organization who planned the event
   * @return {String} the docID of the new document.
   */
  define({ title, image, description, location, time, frequency, accessibilities, requirements, impact, eventPlanner }) {
    // Convert single values to arrays if they are not already
    const accessibilityArray = Array.isArray(accessibilities) ? accessibilities : [accessibilities];
    const requirementsArray = Array.isArray(requirements) ? requirements : [requirements];

    const docID = this._collection.insert({
      title,
      image,
      description,
      location,
      time,
      frequency,
      accessibilities: accessibilityArray.join(', '),
      requirements: requirementsArray.join(', '),
      impact,
      eventPlanner,
    });

    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param title the title of the event
   * @param image the link to the image of the event
   * @param description the description of the event
   * @param location the location of the event
   * @param time the time of the event
   * @param frequency the frequency of the event
   * @param accessibility how accessible the event is (can be a string or an array of strings)
   * @param requirements what is required for the event (can be a string or an array of strings)
   * @param impact the impact of the event
   * @param eventPlanner the organization who planned the event
   */
  update(docID, { title, image, description, location, time, frequency, accessibilities, requirements, impact, eventPlanner }) {
    const updateData = {};

    if (title) {
      updateData.title = title;
    }
    if (image) {
      updateData.image = image;
    }
    if (description) {
      updateData.description = description;
    }
    if (location) {
      updateData.location = location;
    }
    if (time) {
      updateData.time = time;
    }
    if (frequency) {
      updateData.frequency = frequency;
    }
    if (impact) {
      updateData.impact = impact;
    }
    if (eventPlanner) {
      updateData.eventPlanner = eventPlanner;
    }
    if (accessibilities) {
      updateData.accessibilities = accessibilities;
    }
    if (requirements) {
      updateData.requirements = requirements;
    }
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
