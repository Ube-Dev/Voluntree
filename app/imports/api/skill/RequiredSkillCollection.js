import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const requiredSkillPublications = {
  requiredSkill: 'requiredSkill',
};

class RequiredSkillCollection extends BaseCollection {
  constructor() {
    super('requiredSkills', new SimpleSchema({
      requiredSkills: { type: String, index: true, unique: true },
      event: { type: String },
    }));
  }

  /**
   * Defines a new requiredSkill skill.
   * @param requiredSkills the name of the skill.
   * @param event the name of the event that requires these requiredSkills.
   * @return {String} the docID of the new document.
   */
  define({ requiredSkills, event }) {
    const docID = this._collection.insert({
      requiredSkills,
      event,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param requiredSkills the new skill names (optional).
   * @param event the new event (optional).
   */
  update(docID, { requiredSkills, event }) {
    const updateData = {};
    if (requiredSkills) {
      updateData.requiredSkills = requiredSkills;
    }
    if (event) {
      updateData.event = event;
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
      // get the requiredSkillCollection instance.
      const instance = this;
      /** This subscription publishes the entire collection */
      Meteor.publish(requiredSkillPublications.requiredSkill, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for requiredSkill owned by the current user.
   */
  subscribeRequiredSkill() {
    if (Meteor.isClient) {
      return Meteor.subscribe(requiredSkillPublications.requiredSkill);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin, User, Organization.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.ORGANIZATION]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return { requiredSkills, event }
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const requiredSkills = doc.requiredSkills;
    const event = doc.event;
    return { requiredSkills, event };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const RequiredSkills = new RequiredSkillCollection();
