import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const AccountAdded = () => (
  <Container className="py-3">
    <Row className="align-items-center justify-content-center">
      <Col className="text-center">
        <h1>Account created successfully. Welcome to the Voluntree!</h1>
        <Button href="/home" className="m-2">Home</Button>
      </Col>
    </Row>
  </Container>
);

export default AccountAdded;
