// import { Meteor } from 'meteor/meteor'; // this must be imported to invoke meteor methods
// subscription and publication are inside the same class as CRUD operations, I will separate them in the future.
// import { UserProfiles } from '../imports/api/user/UserProfileCollection';
// import { Organization } from '../imports/api/organization/OrganizationCollection';
// import { Skills } from '../imports/api/skill/SkillCollection';
// import { Events } from '../imports/api/event/EventCollection';
// import { createEvent, removeEvent, removeOrganization, updateUserProfile } from '../imports/startup/both/Methods';
/*
import { Meteor } from 'meteor/meteor'; // this must be imported to invoke meteor methods
// subscription and publication are inside the same class as CRUD operations, I will separate them in the future.

import { UserProfiles } from '../imports/api/user/UserProfileCollection';
import { Organization } from '../imports/api/organization/OrganizationCollection';
import { Skills } from '../imports/api/skill/SkillCollection';
import { Events } from '../imports/api/event/EventCollection';
import { createEvent, createSubcategory, removeEvent, removeMainCategory, removeOrganization, removeSubcategory, updateSubcategory, updateUserProfile } from '../imports/startup/both/Methods';
import { MainCategory } from '../imports/api/category/MainCategoryCollection';
import { SubCategory } from '../imports/api/category/SubCategoryCollection';

const mainSubscription = MainCategory.subscribe();
const subSubScription = SubCategory.subscribe();

const mainCategories = MainCategory.find({}).fetch();
const subCategories = SubCategory.find({}).fetch();

function getFormattedCategories() {
  const formattedCategories = {};

  mainCategories.forEach((entity) => {
    // group sub categories by its parent category ID.
    formattedCategories[entity.category] = SubCategory.find({ parentID: entity.categoryID }).fetch().map((obj) => obj.category);
  });
  // group orphan sub categories.
  formattedCategories.others = SubCategory.find({
    $or: [
      { parentID: { $exists: false } },
      { parentID: '' },
    ],
  }).fetch().map((obj) => obj.category);
  console.log(formattedCategories);
}

console.log('Output formatted categories: ');
getFormattedCategories();
const docID = MainCategory.find({ category: 'Education' });
if (docID.count()) {
  Meteor.call(removeMainCategory, docID.fetch()[0]._id);
  console.log('When Education main category is removed: ');
  getFormattedCategories();
}
console.log('remove sub category first entity: ');
Meteor.call(removeSubcategory, subCategories[0]._id);
getFormattedCategories();
// u can also do { category: 'Pollution Control', parentID: parentID } to assign it to a parent.
console.log('create a orphan sub category: ');
Meteor.call(createSubcategory, { category: 'Pollution Control' });
getFormattedCategories();
*/

// Meteor.call(removeMainCategory, docID);

// only parameter is the _id of the event.
// Meteor.call(removeOrganization, '7pnjPhdB57Ass7Xuo');

// const subscription = UserProfiles.subscribeUser();
// const userProfiles = UserProfiles.find({}).fetch();

// console.log(userProfiles);
// // userProfiles
// const id = userProfiles[0]._id;
// /*
// you can update multiple fields in the db at the sametime,  how it works is it overwrites the old ones with the new ones,
// so if you want to update array/object you will have to fetch the old data and append it locally before invoking the update
// method. This is to keep it simple, but isn't a good design in the long run. I will update them in the future.
// */
// const data = { totalHours: userProfiles[0].totalHours + 10 };
// // all data should be Object, atleast for now.
// // (error, result) are optional. Meteor.call(args...); will work too.
// Meteor.call(updateUserProfile, id, data, (error, result) => {
//   if (error) {
//     console.error('Error updating user profile:', error);
//   } else {
//     console.log('User profile updated successfully:', result);
//     // Handle successful update if needed
//   }
// });
