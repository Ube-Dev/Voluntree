import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

const SubscriptionPage = () => (
  <Container fluid>
    <Row>
      <Col className="landing-background">
        <h1>It Takes a Village to Drive Positive Change.</h1>
      </Col>
    </Row>
    <Container className="py-3 align-content-center text-center">
      <Row>
        <h1>Help Grow the Voluntree</h1>
        <p>At Voluntree, we believe in the power of collective action to drive positive change.
          By donating, you&apos;re not just supporting us: you&apos;re enabling change. Your contribution
          helps us maintain and imporve our platform.
        </p>
      </Row>
      <Row>
        <h1>Choose Your Membership</h1>
        <Col>
          <Card>
            <Card.Header>Seedling</Card.Header>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Sapling</Card.Header>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Tree</Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default SubscriptionPage;
