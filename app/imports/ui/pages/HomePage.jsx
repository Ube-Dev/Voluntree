import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import UserHome from '../components/UserHome';
import AdminHome from '../components/AdminHome';

const HomePage = () => {
  const isAdmin = Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN);

  return (
    <Container fluid className="color1">
      {/* checks if the user is an admin or a regular user and renders the appropriate home page */}
      {isAdmin ? <AdminHome /> : <UserHome />}
    </Container>
  );
};

export default HomePage;
