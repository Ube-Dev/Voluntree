import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { UserProfiles } from './UserProfileCollection';
import { Users } from './UserCollection';
import { ROLE } from '../role/Role';

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
    console.log('useprofile called');
    UserProfiles._schema.clean(data);
    const username = data.email;
    const user = UserProfiles._collection.findOne({ email: data.email });
    console.log(user);

    // only create user if the user does not exists in the database.
    if (user === undefined) {
      console.log('inside');
      const role = ROLE.USER;
      let newID;
      // returned newID is the userID, not _id.
      if (data.userID) {
        newID = Users.define({ userID: data.userID, username, role, privilege: data.privilege, password: data.password });
      } else {
        newID = Users.define({ username, role, privilege: data.privilege, password: data.password });
      }
      console.log('newID', newID);

      // revert changes if there is an error while inserting.
      try {
        const profileID = UserProfiles._collection.insert({
          ...data,
          ...{ userID: newID },
        });
        console.log('profileID ', profileID);
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
    try {
      UserProfiles.update(docID, data);
    } catch (error) {
      // Handle or log the error here
      throw new Meteor.Error('update-failed', 'Failed to update user profile: ', error);
    }
  },
});

Meteor.methods({
  'UserProfiles.remove': function (docID) {
    check(docID, String);
    try {
      return UserProfiles.removeIt(docID);
    } catch (error) {
      throw new Meteor.Error('delete-failed', 'Failed to delete user profile: ', error);
    }
  },
});
