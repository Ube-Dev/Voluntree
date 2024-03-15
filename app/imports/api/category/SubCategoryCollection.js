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
      category: { type: String, index: true, unique: true },
      parentID: { type: String, optional: true, defaultValue: '' },
    }));
  }

  /**
   * Check if this sub category exists, insert if not.
   * @param category the name of the sub category.
   * @return {String} the docID of the new document.
   */
  define({ category, parentID }) {
    const docID = this._collection.find({ category }).fetch();
    // if this sub category exists in the db.
    if (docID.length) {
      return docID;
    }
    return this._collection.insert({
      category,
      parentID,
    });
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param category the new sub category name.
   */
  update(docID, { category }) {
    const updateData = {};
    if (category) {
      updateData.category = category;
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
  subscribeSubCategory() {
    if (Meteor.isClient) {
      return Meteor.subscribe(subCategoryPublications.subCategory);
    }
    return null;
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return { category }
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const category = doc.category;
    return { category };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const SubCategory = new SubCategoryCollection();
