/* All publication are stored here */
import { Meteor } from 'meteor/meteor';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { Events } from '../../api/event/EventCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Organization } from '../../api/organization/OrganizationCollection';

// Call publish for all the collections.
MATPCollections.collections.forEach(c => c.publish());

// publish single events
Events.publishSingleEvent();
UserProfiles.publishSingleUser();
Organization.publishSingleOrganization();

// alanning:roles publication
// Recommended code to publish roles for each user.
// eslint-disable-next-line consistent-return
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  this.ready();
});
