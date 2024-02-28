import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Col, Button, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container id={PAGE_IDS.SIGN_OUT} fluid>
      <Row className="py-3 align-items-center justify-content-center login-background">
        <Col className="text-center py-3 login-text">
          <h2>You are signed out.</h2>
          <Button href="/" className="m-2">Home</Button>
          <Button href="signin" className="m-2">Sign in</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SignOut;
