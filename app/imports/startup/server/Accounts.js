import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { Skills } from '../../api/skill/SkillCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';

/* eslint-disable no-console */

function createUser(
  email,
  firstName,
  lastName,
  password,
  image,
  phone,
  bookmarks,
  viewingHistory,
  pastEvents,
  onGoingEvents,
  userActivity,
  role,
  totalHours,
  address,
  zipCode,
  city,
  state,
  country,
  feedbacks,
  skills,
  followers,
  organizationFollowed,
  memberOf,
  userID,
  privilege,
) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    AdminProfiles.define({ email, firstName, lastName, password });
  } else { // everyone else is just a user.
    UserProfiles.define({ email, firstName, lastName, password, image, phone, bookmarks,
      viewingHistory, pastEvents, onGoingEvents, userActivity, role,
      totalHours, address, zipCode, city, state, country, feedbacks, skills,
      followers, organizationFollowed, memberOf, userID, privilege });
    if (skills) {
      skills.map(skill => Skills.define({ skill: skill }));
      console.log(`skill added: ${skills}`);
    }
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({
      email, firstName, lastName, password, image, phone, bookmarks,
      viewingHistory, pastEvents, onGoingEvents, userActivity, role,
      totalHours, address, zipCode, city, state, country, feedbacks, skills,
      followers, organizationFollowed, memberOf, userID, privilege,
    }) => createUser(
      email,
      firstName,
      lastName,
      password,
      image,
      phone,
      bookmarks,
      viewingHistory,
      pastEvents,
      onGoingEvents,
      userActivity,
      role,
      totalHours,
      address,
      zipCode,
      city,
      state,
      country,
      feedbacks,
      skills,
      followers,
      organizationFollowed,
      memberOf,
      userID,
      privilege,
    ));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
