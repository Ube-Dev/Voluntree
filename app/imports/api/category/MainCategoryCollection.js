import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const mainCategoryPublications = {
  mainCategory: 'mainCategory',
};

class MainCategoryCollection extends BaseCollection {
  constructor() {
    super('MainCategory', new SimpleSchema({
      category: { type: String, index: true, unique: true },
      categoryID: { type: String, optional: true, defaultValue: '' },
    }));
  }

  /**
   * Check if this main category exists, insert if not.
   * @param category the name of the main category.
   * @return {String} the categoryID of the new document.
   */
  define({ category }) {
    const docID = this._collection.find({ category }).fetch();
    // if this main category exists in the db.
    if (docID.length) {
      return docID;
    }
    let credential = '';
    const maxPasswordLength = 30;
    const minPasswordLength = 6;
    const passwordLength = Math.floor(Math.random() * (maxPasswordLength - (minPasswordLength + 1))) + minPasswordLength;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < passwordLength; i++) {
      credential += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const ID = credential;
    this._collection.insert({
      category,
      categoryID: ID,
    });
    return ID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param category the new main category name.
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
   * @returns categoryID
   */
  removeIt(docID) {
    const doc = this.findDoc(docID);
    check(doc, Object);
    const categoryID = doc.categoryID;
    this._collection.remove(doc._id);
    return categoryID;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for all users.
   */
  publish() {
    if (Meteor.isServer) {
      // get the MainCategory instance.
      const instance = this;
      /** This subscription publishes the entire mainCategory collection */
      Meteor.publish(mainCategoryPublications.mainCategory, function publish() {
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
  subscribeMainCategory() {
    if (Meteor.isClient) {
      return Meteor.subscribe(mainCategoryPublications.mainCategory);
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
export const MainCategory = new MainCategoryCollection();
