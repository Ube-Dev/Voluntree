import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { UserProfiles } from './UserProfileCollection';
import { Users } from './UserCollection';
import { ROLE } from '../role/Role';
import { isAOrganization, isAUser, isAUser_id, isEvent, isSkill } from '../base/BaseUtilities';

export const signUpNewUserMethod = new ValidatedMethod({
  name: 'UserProfiles.SignupNewUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, firstName, lastName, password }) {
    console.log('signup called');
    if (Meteor.isServer) {
      if (UserProfiles._collection.findOne({ email, firstName, lastName }) === null) {
        const newID = Users.define({ username: email, role: ROLE.USER, password });
        return UserProfiles._collection.insert({ email, firstName, lastName, userID: newID });
      }
      return '';
    }
    return '';
  },
});

Meteor.methods({
  'UserProfiles.define': function (data) {
    check(data, Object);
    console.log('useprofile called: ', data);
    UserProfiles._schema.clean(data);
    const username = data.email;
    const user = UserProfiles._collection.findOne({ email: data.email });
    console.log(user);

    // only create user if the user does not exists in the database.
    if (user === undefined) {
      const role = ROLE.USER;
      let newID;
      // returned newID is the userID, not _id.
      if (data.userID) {
        newID = Users.define({ userID: data.userID, username, role, privilege: data.privilege, password: data.password });
      } else {
        newID = Users.define({ username, role, privilege: data.privilege, password: data.password });
      }

      // TO-DO revert changes if there is an error while inserting.
      try {
        const profileID = UserProfiles._collection.insert({
          ...data,
          ...{ userID: newID, role: ROLE.USER },
        });
        return profileID;
      } catch (error) {
        // delete the user acc and profile.
        throw new Meteor.Error('userProfile create failed', 'Error inserting new profile.', error);
      }
    }

    throw new Meteor.Error('create-failed', 'User exists');
  },
});

Meteor.methods({
  'UserProfiles.update': function (docID, data) {
    check(docID, String);
    check(data, Object);

    // Ensure the user exists
    if (!isAUser_id(docID)) {
      throw new Meteor.Error('update-failed', 'User does not exist.');
    }

    // Perform the update
    try {
      const updateData = {};

      // Iterate over the data fields and validate them
      Object.keys(data).forEach(key => {
        switch (key) {
        case 'bookmarks':
          data[key].forEach(eventID => {
            if (!isEvent(eventID)) {
              throw new Meteor.Error('update-failed-bookmarks', `bookmark with eventID ${eventID} does not exist.`);
            }
          });
          updateData[key] = data[key];
          break;
        case 'viewingHistory':
          data[key].forEach(eventID => {
            if (!isEvent(eventID)) {
              throw new Meteor.Error('update-failed-viewingHistory', `viewingHistory with eventID ${eventID} does not exist.`);
            }
          });
          updateData[key] = data[key];
          break;
        case 'pastEvents': // depends on if we want to store past events
        case 'onGoingEvents':
          data[key].forEach(eventID => {
            if (!isEvent(eventID)) {
              throw new Meteor.Error('update-failed-onGoingEvents', `onGoingEvent with eventID ${eventID} does not exist.`);
            }
          });
          updateData[key] = data[key];
          break;

        case 'skills':
          data[key].forEach(skillName => {
            if (!isSkill(skillName)) {
              throw new Meteor.Error('update-failed-skills', `Skill with name ${skillName} does not exist.`);
            }
          });
          updateData[key] = data[key];
          break;

        case 'followers':
          data[key].forEach(userID => {
            if (!isAUser(userID)) {
              throw new Meteor.Error('update-failed-followers', `Follower user with ID ${userID} does not exist.`);
            }
          });
          updateData[key] = data[key];
          break;

        case 'organizationFollowed':
          data[key].forEach(organizationID => {
            if (!isAOrganization(organizationID)) {
              throw new Meteor.Error('update-failed-organizationFollowed', `Organization with ID ${organizationID} does not exist.`);
            }
          });
          updateData[key] = data[key];
          break;
        case 'memberOf':
          // Validate each organization ID
          data[key].forEach(organizationID => {
            if (!isAOrganization(organizationID)) {
              throw new Meteor.Error('update-failed-memberOf', `Organization with ID ${organizationID} does not exist.`);
            }
          });
          updateData[key] = data[key];
          break;
        default:
          updateData[key] = data[key];
        }
      });

      // Update the user profile
      UserProfiles._collection.update(docID, { $set: updateData });

    } catch (error) {
      throw new Meteor.Error('update-failed', `Failed to update user profile: ${error}`);
    }
  },
});

Meteor.methods({
  'UserProfiles.remove': function (docID) {
    check(docID, String);
    try {
      const result = UserProfiles._collection.remove(docID);
      if (isAUser_id(docID)) {
        throw Meteor.error('remove-failed', 'User still in the database.');
      }
      return result;
    } catch (error) {
      throw new Meteor.Error('delete-failed', 'Failed to delete user profile: ', error);
    }
  },
});
