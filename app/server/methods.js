import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  sendVerification: function (email) {
    check(email, String);
    const user = Accounts.findUserByUsername(email);

    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found');
    }

    // Extract user ID and email address
    const _id = user._id;
    const userEmail = user.emails[0].address;

    // Send verification email
    Accounts.sendVerificationEmail(_id, userEmail, (error) => {
      if (error) {
        console.error('Error sending verification email:', error.reason);
        throw new Meteor.Error('verification-email-failed', 'Verification email could not be sent');
      } else {
        console.log('Verification email sent successfully!');
      }
    });
    console.log('Email sent. Refer to the URL sent through email or remove the hash above.');
  },
});

Meteor.methods({
  'sendResetPasswordEmail_'(email) {
    check(email, String);
    // Check if the email exists in the database.
    const user = Accounts.findUserByEmail(email);
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found');
    }
    const userEmail = user.emails[0];
    // !email.verified is for testing purposes, remove ! afterward.
    // if (!email.verified) {
    //   Accounts.sendResetPasswordEmail(user._id, userEmail);
    // }
    console.log(`id: ${user._id}, email: ${userEmail.address}`);
    Accounts.sendResetPasswordEmail(user._id, userEmail.address);
    console.log('Email sent. Refer to the URL sent through email or remove the hash above.');
  },
});
