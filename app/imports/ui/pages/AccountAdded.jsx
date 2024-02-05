import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const AccountAdded = () => (
  <Container className="py-3">
    <Row className="align-items-center justify-content-center">
      <Col className="text-center">
        <h1>Account created successfully. Welcome to the Voluntree!</h1>
      </Col>
    </Row>
  </Container>
);

export default AccountAdded;
