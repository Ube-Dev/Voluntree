import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const skillPublications = {
  skill: 'skill',
};

class SkillCollection extends BaseCollection {
  constructor() {
    super('Skills', new SimpleSchema({
      skill: { type: String, index: true, unique: true },
    }));
  }

  /**
   * Check if the skill exists, insert if not.
   * @param skills the name of the skill.
   * @return {String} the docID of the new document.
   */
  define({ skill }) {
    const docID = this._collection.find({ skill }).fetch();
    // if skill exists in the db.
    if (docID.length) {
      return docID;
    }

    return this._collection.insert({
      skill,
    });
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param skills the new skill name (optional).
   */
  update(docID, { skills }) {
    const updateData = {};
    if (skills) {
      updateData.skills = skills;
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
      Meteor.publish(skillPublications.skill, function publish() {
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
      return Meteor.subscribe(skillPublications.skill);
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.ORGANIZATION]);
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
export const Skills = new SkillCollection();
