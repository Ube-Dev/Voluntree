import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MainCategory } from '../../api/category/MainCategoryCollection';
import { SubCategory } from '../../api/category/SubCategoryCollection';

Meteor.methods({
'MainCategory.define': function (data) {
    check(data, Object);
    try {
    return MainCategory.define(data);
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
    subCategoryBeforeUpdate = SubCategory.find({ parentID: mainCategoryBeforeRemove._id }).fetch();

    // Perform the transaction
    const parentID = MainCategory.removeIt(docID);

    // Update documents with matching parentID
    SubCategory._collection.update(
        { parentID: parentID },
        { $set: { parentID: '' } },
        { multi: true },
    );
    } catch (error) {
    // If any error occurs during the transaction, revert the changes
    if (mainCategoryBeforeRemove) {
        MainCategory._collection.insert(mainCategoryBeforeRemove);
    }
    if (subCategoryBeforeUpdate) {
        subCategoryBeforeUpdate.forEach(category => {
        SubCategory._collection.update(
            { _id: category._id },
            { $set: { parentID: category.parentID } },
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
    return SubCategory.define(data);
    } catch (error) {
    throw new Meteor.Error('create-failed', 'Failed to create new sub category: ', error);
    }
},
});

Meteor.methods({
'Subcategory.update': function (data) {
    check(data, Object);
    try {
    SubCategory.update(data);
    } catch (error) {
    throw new Meteor.Error('update-failed', 'Failed to update sub category: ', error);
    }
},
});

Meteor.methods({
'Subcategory.remove': function (docID) {
    check(docID, String);
    try {
    SubCategory.removeIt(docID);
    } catch (error) {
    throw new Meteor.Error('remove-failed', 'Failed to remove sub category: ', error);
    }
},
});
