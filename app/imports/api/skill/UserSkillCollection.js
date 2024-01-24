import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const userSkillPublications = {
  userSkill: 'userSkill',
};

class UserSkillCollection extends BaseCollection {
  constructor() {
    super('userSkills', new SimpleSchema({
      skills: { type: String, index: true, unique: true },
      user: { type: String },
    }));
  }

  /**
   * Defines a new userSkill skill.
   * @param skills the name of the skill.
   * @param user the name of the user that has these skills.
   * @return {String} the docID of the new document.
   */
  define({ skills, user }) {
    const docID = this._collection.insert({
      skills,
      user,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param skills the new skill names (optional).
   * @param user the new user (optional).
   */
  update(docID, { skills, user }) {
    const updateData = {};
    if (skills) {
      updateData.skills = skills;
    }
    if (user) {
      updateData.user = user;
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
      // get the userSkillCollection instance.
      const instance = this;
      /** This subscription publishes the entire collection */
      Meteor.publish(userSkillPublications.userSkill, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for userSkill owned by the current user.
   */
  subscribeRequiredSkill() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userSkillPublications.userSkill);
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
   * @return { skills, user }
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const skills = doc.skills;
    const user = doc.user;
    return { skills, user };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserSkills = new UserSkillCollection();
