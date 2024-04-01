import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MainCategory } from './MainCategoryCollection';
import { SubCategory } from './SubCategoryCollection';
import { validMainCategory } from '../base/BaseUtilities';

Meteor.methods({
  'MainCategory.define': function (data) {
    check(data, Object);
    try {
      return MainCategory._collection.insert(data);
    } catch (error) {
      throw new Meteor.Error('MainCategory.define', 'Failed to create new main categories: ', error);
    }
  },
});

Meteor.methods({
  'MainCategory.remove': function (docID) {
    check(docID, String);

    // Define variables to store the state before the transaction
    let mainCategoryBeforeRemove;
    let subCategoryBeforeUpdate;

    try {
    // Store the state before the transaction begins
      mainCategoryBeforeRemove = MainCategory.findOne(docID);
      subCategoryBeforeUpdate = SubCategory.find({ parentCategory: mainCategoryBeforeRemove.category }).fetch();

      // Perform the transaction
      const result = MainCategory._collection.remove(docID);

      // Update documents with matching parentID
      SubCategory._collection.update(
        { parentCategory: mainCategoryBeforeRemove.category },
        { $set: { parentCategory: 'General' } },
        { multi: true },
      );
      return result;
    } catch (error) {
    // If any error occurs during the transaction, revert the changes
      if (mainCategoryBeforeRemove) {
        MainCategory._collection.insert(mainCategoryBeforeRemove);
      }
      if (subCategoryBeforeUpdate) {
        subCategoryBeforeUpdate.forEach(category => {
          SubCategory._collection.update(
            { _id: category._id },
            { $set: { parentCategory: category.parentCategory } },
          );
        });
      }

      // Throw an error indicating the removal failed and rollback was performed
      throw new Meteor.Error('remove-failed', 'Either failed to remove category or transaction: ', error);
    }
  },
});

Meteor.methods({
  'Subcategory.define': function (data) {
    check(data, Object);
    try {
      return SubCategory._collection.insert(data);
    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new sub category: ', error);
    }
  },
});

Meteor.methods({
  'Subcategory.update': function (docID, data) {
    check(data, Object);
    check(docID, String);
    try {
      if (data.parentCategory) {
        if (!validMainCategory(data.parentCategory)) {
          throw new Meteor.Error('update-failed', 'Parent main category does not exists.');
        }
      }
      SubCategory._collection.update(docID, data);
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update sub category: ', error);
    }
  },
});

Meteor.methods({
  'Subcategory.remove': function (docID) {
    check(docID, String);
    try {
      return SubCategory._collection.remove(docID);
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove sub category: ', error);
    }
  },
});
