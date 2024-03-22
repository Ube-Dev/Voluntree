import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/SubscriptionPage.css';

const SubscriptionPage = () => (
  <Container fluid className="color1">
    <Row>
      <Col className="landing-background">
        <h1>It Takes a Village to Drive Positive Change.</h1>
      </Col>
    </Row>
    <Container className="py-3">
      <Row className="text-center">
        <h1>Choose Your Membership</h1>
      </Row>
      <Row>
        <Col>
          <Card className="text-start card-membership">
            <Card.Header><h3>Seedling</h3></Card.Header>
            <Card.Body>
              <Card.Title className="mb-2">$5/Month</Card.Title>
              <Card.Text>This is the foundation!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-start card-membership-sp">
            <Card.Header><h3>Sapling</h3></Card.Header>
            <Card.Body>
              <Card.Title className="mb-2">$10/Month</Card.Title>
              <Card.Text>Grow with us!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-start card-membership">
            <Card.Header><h3>Tree</h3></Card.Header>
            <Card.Body>
              <Card.Title className="mb-2">$20/Month</Card.Title>
              <Card.Text>Branch out!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="py-3 align-content-center text-center">
        <h1>Help Grow the Voluntree</h1>
        <p>At Voluntree, we believe in the power of collective action to drive positive change.
          By donating, you&apos;re not just supporting us: you&apos;re enabling change. Your contribution
          helps us maintain and imporve our platform.
        </p>
      </Row>
    </Container>
  </Container>
);

export default SubscriptionPage;
