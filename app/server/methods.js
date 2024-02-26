import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'sendVerification': function(email) {
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
    }
  });
