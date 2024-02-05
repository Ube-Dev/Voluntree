import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { Skills } from '../../api/skill/SkillCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';

/* eslint-disable no-console */

function createUser(email, role, firstName, lastName, skills, password) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    AdminProfiles.define({ email, firstName, lastName, password });
  } else { // everyone else is just a user.
    UserProfiles.define({ email, firstName, lastName, skills, password });
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
      email,
      role,
      firstName,
      lastName,
      skills,
      password,
      name,
      image,
      location,
      mission,
      contactInfo,
    }) => createUser(
      email,
      role,
      firstName,
      lastName,
      skills,
      password,
      name,
      image,
      location,
      mission,
      contactInfo,
    ));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
