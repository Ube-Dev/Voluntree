import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const userHasSkillPublications = {
  skill: 'skill',
};

class UserHasSkillCollection extends BaseCollection {
  constructor() {
    super('UserHasSkill', new SimpleSchema({
      userID: { type: String },
      skillID: { type: String, index: true, unique: true },
    }));
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param skill the new skill name (optional).
   */
  update(docID, { skillID }) {
    const updateData = {};
    if (skillID) {
      updateData.userID = Meteor.userID();
      updateData.skill = skillID;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } skills A document or docID in this collection.
   * @returns true
   */
  removeIt(skills) {
    const doc = this.findDoc(skills);
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
      // get the SkillCollection instance.
      const instance = this;
      /** This subscription publishes the entire skill collection */
      Meteor.publish(UserHasSkillCollection.skill, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for skills.
   */
  subscribeSkill() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userHasSkillPublications.skill);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin, User, or Organization.
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
   * @return { skills }
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const skills = doc.skills;
    return { skills };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Skills = new UserHasSkillCollection();
