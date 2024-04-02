/* All publication are stored here */
import { Meteor } from 'meteor/meteor';
import { MATPCollections } from '../../api/matp/MATPCollections';

// Call publish for all the collections.
MATPCollections.collections.forEach(c => c.publish());

// alanning:roles publication
// Recommended code to publish roles for each user.
// eslint-disable-next-line consistent-return
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  this.ready();
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, { fields: { _id: 1, username: 1, emails: 1, privilege: 1 } });
  }
  return this.ready();

});
