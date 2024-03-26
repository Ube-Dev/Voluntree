import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../css/SubscriptionPage.css';

const SubscriptionPage = () => (
  <Container fluid className="color1">
    <Row>
      <Col className="subscription-background text-center">
        <h1>It Takes a Village to create Change</h1>
      </Col>
    </Row>
    <Container className="py-3">
      <Row className="py-3 align-content-center text-center">
        <h1>Help Grow the Voluntree</h1>
      </Row>
      <Row>
        <Card className="rounded-4 text-center header-card">
          <Card.Body>
            <h5>
              At Voluntree, we believe in the power of collective action to drive positive change.
              By donating, you&apos;re not just supporting us: you&apos;re enabling change. Your contribution
              helps us maintain and imporve our platform so that we can branch out further.
            </h5>
          </Card.Body>
        </Card>
      </Row>
      <Row className="py-3 text-center">
        <h1 style={{ color: 'gold' }}>Choose Your Membership</h1>
        <hr />
      </Row>
      <Row>
        <Col sm={12} lg={3}>
          <Card className="text-start card-membership">
            <Card.Header><h3>Soil</h3></Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Button>Join</Button>
              </Row>
              <Card.Title className="mb-2">FREE</Card.Title>
              <Card.Text>It all starts with you!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={3}>
          <Card className="text-start card-membership">
            <Card.Header><h3>Seedling</h3></Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Button>Join</Button>
              </Row>
              <Card.Title className="mb-2">$5/Month</Card.Title>
              <Card.Text>This is the foundation!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={3}>
          <Card className="text-start card-membership-sp">
            <Card.Header><h3>Sapling</h3></Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Button>Join</Button>
              </Row>
              <Card.Title className="mb-2">$10/Month</Card.Title>
              <Card.Text>Grow with us!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={3}>
          <Card className="text-start card-membership">
            <Card.Header><h3>Tree</h3></Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Button>Join</Button>
              </Row>
              <Card.Title className="mb-2">$20/Month</Card.Title>
              <Card.Text>Branch out!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <hr />
      </Row>
      <Row className="text-center">
        <h3>
          Joining Voluntree is free, but your support is invaluable.
        </h3>
      </Row>
    </Container>
  </Container>
);

export default SubscriptionPage;
