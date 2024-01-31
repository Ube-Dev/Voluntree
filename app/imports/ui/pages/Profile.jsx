import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import UserProfileCard from '../components/UserProfileCard';
import OrgProfileCard from '../components/OrgProfileCard';

const Profile = () => (
  <Container className="py-3">
    {(Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) || Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) ? (
      <UserProfileCard />
    ) : ''}
    {Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
      <OrgProfileCard />
    ) : ''}
  </Container>
);

export default Profile;
