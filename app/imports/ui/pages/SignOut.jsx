import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Col, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container id={PAGE_IDS.SIGN_OUT} className="justify-content-center py-3 login-background" fluid>
      <Col className="text-center py-3 login-text">
        <h2>You are signed out.</h2>
        <Button href="/" className="m-2">Home</Button>
        <Button href="signin" className="m-2">Sign in</Button>
      </Col>
    </Container>
  );
};

export default SignOut;
