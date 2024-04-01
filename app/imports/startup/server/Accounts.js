/* Store user Accounts configs and its start ups */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { createSkill, createUserProfile } from '../both/Methods';
/* eslint-disable no-console */
/* eslint-disable function-call-argument-newline */
/* eslint-disable function-paren-newline */
Meteor.startup(function () {

  const settings = Meteor.settings.packages.email;
  process.env.MAIL_URL = `smtp://${settings.user}:${settings.password}@${settings.service}`;
  Accounts.config({ sendVerificationEmail: true });
  // console.log(`smtp://${encodeURIComponent(settings.user)}:${encodeURIComponent(settings.password)}@${settings.service}`);
  Accounts.emailTemplates.verifyEmail = {
    from() {
      return 'Voluntree';
    },
    subject() {
      return 'Verify Your EmailPage Address';
    },
    text(user, url) {
      const urlWithoutHash = url.replace('#/', '');
      return `Welcome to our application! To verify your email address (${user.emails[0].address}), simply click the link below:\n\n${urlWithoutHash}\n\nIf you did not request this verification, please ignore this email. Thanks!`;
    },
  };
  Accounts.emailTemplates.resetPassword = {
    from() {
      return 'Voluntree';
    },
    subject() {
      return 'Reset Your Account Password';
    },
    text(user, url) {
      const urlWithoutHash = url.replace('#/', '');
      return `Hello,

      To reset your password, simply click the link below. simply click the link below:\n\n${urlWithoutHash}\n\nIf you did not request this, please ignore this email. Thanks!`;
    },
  };
});

function createUser(data) {
  console.log(`  Creating user ${data.email} with role ${data.role}.`);
  if (data.role === ROLE.ADMIN) {
    AdminProfiles.define({ email: data.email, firstName: data.firstName, lastName: data.lastName, password: data.password, userID: data.userID });
  } else { // everyone else is just a user.
    Meteor.call(createUserProfile, data);
    if (data.skills) {
      data.skills.map(skill => Meteor.call(createSkill, { skill: skill }));
      console.log(`skill added: ${data.skills}`);
    }
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach((data) => createUser(data));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
