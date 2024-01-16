import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventPublications = {
  event: 'Event',
  eventAdmin: 'EventAdmin',
};

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      title: String,
      image: String,
      description: String,
      location: String,
      time: {
        type: Date,
        defaultValue: new Date(),
      },
      frequency: String,
      requiredSkills: String,
      accessibility: String,
      requirements: String,
      impact: String,
      eventPlanner: String,
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
   * @param requiredSkills the skills required for the event
   * @param accessibility how accessible the event is
   * @param requirements what is required for the event
   * @param impact the impact of the event
   * @param eventPlanner the organization who planned the event
   * @return {String} the docID of the new document.
   */
  define({ title, image, description, location, time, frequency, requiredSkills, accessibility, requirements, impact, eventPlanner }) {
    const docID = this._collection.insert({
      title,
      image,
      description,
      location,
      time,
      frequency,
      requiredSkills,
      accessibility,
      requirements,
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
   * @param requiredSkills the skills required for the event
   * @param accessibility how accessible the event is
   * @param requirements what is required for the event
   * @param impact the impact of the event
   * @param eventPlanner the organization who planned the event
   */
  update(docID, { title, image, description, location, time, frequency, requiredSkills, accessibility, requirements, impact, eventPlanner }) {
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
    if (requiredSkills) {
      updateData.requiredSkills = requiredSkills;
    }
    if (accessibility) {
      updateData.accessibility = accessibility;
    }
    if (requirements) {
      updateData.requirements = requirements;
    }
    if (impact) {
      updateData.impact = impact;
    }
    if (eventPlanner) {
      updateData.eventPlanner = eventPlanner;
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
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the EventCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(eventPublications.event, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(eventPublications.eventAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeStuff() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.event);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeStuffAdmin() {
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
    const name = doc.name;
    const quantity = doc.quantity;
    const condition = doc.condition;
    const owner = doc.owner;
    return { name, quantity, condition, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();
