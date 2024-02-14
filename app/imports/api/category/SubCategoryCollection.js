import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const subCategoryPublications = {
  subCategory: 'subCategory',
};

class SubCategoryCollection extends BaseCollection {
  constructor() {
    super('SubCategory', new SimpleSchema({
      name: { type: String, index: true, unique: true },
      parentID: { type: String, optional: true, defaultValue: '' },
    }));
  }

  /**
   * Check if this sub category exists, insert if not.
   * @param name the name of the sub category.
   * @return {String} the docID of the new document.
   */
  define({ name, parentID }) {
    const docID = this._collection.find({ name }).fetch();
    // if this sub category exists in the db.
    if (docID.length) {
      return docID;
    }
    return this._collection.insert({
      name,
      parentID,
    });
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new sub category name.
   */
  update(docID, { name }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } docID A document or docID in this collection.
   * @returns true
   */
  removeIt(docID) {
    const doc = this.findDoc(docID);
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
      // get the MainCategory instance.
      const instance = this;
      /** This subscription publishes the entire subCategory collection */
      Meteor.publish(subCategoryPublications.subCategory, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for category.
   */
  subscribeSkill() {
    if (Meteor.isClient) {
      return Meteor.subscribe(subCategoryPublications.subCategory);
    }
    return null;
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return { name }
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    return { name };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const SubCategory = new SubCategoryCollection();
