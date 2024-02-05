import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const AccountAdded = () => (
  <Container fluid>
    <Row className="py-3 align-items-center justify-content-center login-background">
      <Col className="text-center login-text">
        <h1>Account created successfully. Welcome to the Voluntree!</h1>
        <Button href="/home" className="m-2">Home</Button>
      </Col>
    </Row>
  </Container>
);

export default AccountAdded;
