import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../css/SubscriptionPage.css';
import { PAGE_IDS } from '../utilities/PageIDs';

const SubscriptionPage = () => (
  <Container fluid className="color1" id={PAGE_IDS.SUBSCRIBE}>
    <Row>
      <Col className="subscription-background text-center">
        <h1>It Takes a Village to Create Change</h1>
      </Col>
    </Row>
    <Container className="py-3">
      <Row className="py-3 align-content-center text-center">
        <h1>Help Grow the Voluntree</h1>
      </Row>
      <Row>
        <Card className="rounded-4 py-3 text-center header-card">
          <Card.Body>
            <h5>
              At Voluntree, we believe in the power of collective action to drive positive change.
              By donating, you&apos;re not just supporting us: you&apos;re enabling change. Your contribution
              helps us maintain and improve our platform so that we can branch out further.
            </h5>
          </Card.Body>
        </Card>
      </Row>
      <Row className="py-3 text-center">
        <h1 className="yellow">Choose Your Membership</h1>
      </Row>
      <Row className="mb-1">
        <Col sm={12} lg={3}>
          <Card className="text-start card-membership">
            <Card.Header><h3>Soil</h3></Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Button href="/signin">Join</Button>
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
              <Card.Title className="mb-2">$3/Month</Card.Title>
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
      </Row>
      <hr />
      <Row className="text-center py-2">
        <h2>
          Joining Voluntree is free, but your support is invaluable.
        </h2>
      </Row>
      <hr />
      <Row className="py-2 mb-3">
        <h3>How Your Subscription Helps:</h3>
        <h5>Maintaining Servers:</h5>
        <p>Your subscription helps cover the costs of hosting and maintaining our website and database, ensuring smooth operation.</p>
        <h5>Developing Features:</h5>
        <p>We constantly strive to enhance our platform with new features and improvements based on user feedback. Your subscription fuels this innovation.</p>
        <h5>Outreach:</h5>
        <p>With your support, we can reach more volunteers and nonprofits, expanding our network and impact.</p>
      </Row>
    </Container>
  </Container>
);

export default SubscriptionPage;
