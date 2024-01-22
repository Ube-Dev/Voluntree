import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Col } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container id={PAGE_IDS.SIGN_OUT} className="justify-content-center py-3">
      <Col className="text-center py-3">
        <h2>You are signed out. Thank you for using the Voluntree!</h2>
      </Col>
    </Container>
  );
};

export default SignOut;
