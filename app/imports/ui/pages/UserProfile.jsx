import React from 'react';
import { Meteor } from 'meteor/meteor';
import { UserCollection } from '../../api/user/UserCollection';

const UserProfile = () => {


  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return (
    <div>
      <h1>{currentUser}</h1>
    </div>
  );
};

export default UserProfile;
