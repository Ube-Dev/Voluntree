/* eslint-disable */
import { Meteor } from 'meteor/meteor';
import { Notification_ } from '../imports/api/notification/NotificationCollection';
import { Organization } from '../imports/api/organization/OrganizationCollection';
import { createComment, createReview, createUserProfile, organizationAddHours, removeComment, removeReview, sendNotification, udpateComment, updateReview } from '../imports/startup/both/Methods';
import { UserProfiles } from '../imports/api/user/UserProfileCollection';

  // const organizationReady = Organization.subscribeOrganization();
  // const userReady = UserProfiles.subscribeUser();
  // let organizationID =  Organization.findOne().organizationID;
  // let userIDs = UserProfiles.find().fetch().map(entity => entity.userID);

  // // organization to multiple users
  // let data = {
  //   receivers: userIDs,
  //   senderGroup: 'ORGANIZATION',
  //   sender: organizationID,
  //   title: 'sample notification',
  //   content: 'sample content',
  // }

  // console.log(data);

  // Meteor.call(sendNotification, data);

  // // organization to single user

  // data = {
  //   receivers: [userIDs[0]],
  //   senderGroup: 'ORGANIZATION',
  //   sender: organizationID,
  //   title: 'sample notification',
  //   content: 'sample content',
  // }
  // Meteor.call(sendNotification, data);

  // // user to user
  // data = {
  //   receivers: [userIDs[0]],
  //   senderGroup: 'USER',
  //   sender: userIDs[1],
  //   title: 'sample notification',
  //   content: 'sample content',
  //   z: 's'
  // }
  // Meteor.call(sendNotification, data);

  // // if non existing user
  // data = {
  //   receivers: ['asda'],
  //   senderGroup: 'USER',
  //   sender: userIDs[0],
  //   title: 'sample notification',
  //   content: 'sample content',
  //   z: 's'
  // }
  // Meteor.call(sendNotification, data)
  // // if non existing organization

  // // retrieve notification by specific organization
  // // console.log(Notification_.subscribeUserNotification(userIDs[0]))
  // // console.log(Notification_.find().fetch());
  // // retrieve notification by specific user

// user registration/creation

// Meteor.call(createUserProfile, { firstName: 'sdaswa', lastName: 'lsdassa', email: 'wasidasn@gm.com', password: 'sda' });

// test update review
// Meteor.call(updateReview, "qwe890poi", { content: 'zzzz', rating: 1 });
// test remove review
// console.log();
// Meteor.call(createReview, { rating: 5, reviewerID: 'FJHc6qrg9KzmDnwPt', reviewFor: {  "type": "event",
// "ID": "nT7sXq9KdYfR" }, content: 'zasdni' });

// Meteor.call(organizationAddHours, "1SkcLcs", 5);

// comment with non existing user
// Meteor.call(createComment, { userID: 'zz', commentFor: { "type": "organization", "ID": "lMnOpQrStUv2" }, content: '1'}, function(error) {
//   if (error) {
//     console.log('Pass', 'comment with non existing user');
//   } else {
//     console.error('error', 'comment with non existing user');
//   }
// });
// // comment with non existing target in commentFor
// Meteor.call(createComment, { userID: 'FJHc6qrg9KzmDnwPt', commentFor: { "type": "organization", "ID": "s" }, content: '1'}, function(error) {
//   if (error) {
//     console.log('Pass', 'comment with non existing target in commentFor');
//   } else {
//     console.error('error', 'comment with non existing target in commentFor');
//   }
// });

// comment with mismatching parentID
// Meteor.call(createComment, { userID: 'FJHc6qrg9KzmDnwPt', commentFor: { "type": "organization", "ID": "lMnOpQrStUv2" }, content: '1', parentID: 'KlMnOpQrStUv'}, function(error) {
//   if (error) {
//     console.log('error', 'comment with parentID');
//   } else {
//     console.error('Pass', 'comment with parentID');
//   }
// });

// update content
// Meteor.call(udpateComment, 'WxYz98765432', { content: 'zzz' }, function(error) {
//   if (error) {
//     console.error('error', 'update content', error);
//   } else {
//     console.log('Pass', 'update content');
//   }
// });
// update userID
// Meteor.call(udpateComment, 'fGhIjKlMnOpQ', { userID: 'zzz' }, function(error) {
//   if (error) {
//     console.log('Pass', 'update user');
//   } else {
//     console.error('error', 'update user');
//   }
// });
// remove comment
// Meteor.call(removeComment, 'FgHiJkLmNoPq', function(error) {
//   if (error) {
//     console.error('error', 'remove comment', error);
//   } else {
//     console.log('Pass', 'remove comment');
//   }
// });
