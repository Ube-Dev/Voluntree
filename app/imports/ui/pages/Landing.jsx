import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const Landing = () => (
  <>
    <Container fluid id={PAGE_IDS.LANDING} className="landing-background p-0">
      <Row className="align-middle text-center">
        <Col xs={12} className="justify-content-center">
          <Image src="/images/voluntree.png" alt="Voluntree Logo" className="mx-auto d-block" style={{ width: '85%' }} />
          <h2>Working together made simple</h2>
        </Col>
      </Row>
      <Row className="mb-5 g-0 justify-content-center">
        <Col xs="auto">
          <Button className="rounded-0" variant="outline-light-landing" size="lg" href="/signin">
            Sign In
          </Button>
        </Col>
        <Col xs="auto">
          <Button className="rounded-0" variant="light" size="lg" href="/signup">
            Register
          </Button>
        </Col>
      </Row>
    </Container>
    <Container fluid className="color2 py-1 px-3">
      <Col className="col-6 d-flex align-items-center justify-content-center text-center">
        <h2>Your Path to Meaningful Volunteering</h2>
        <p>Are you ready to make a positive impact on the world? Welcome to The Voluntree – your gateway to meaningful volunteer opportunities.
          Our platform is designed to connect passionate individuals like you with organizations that need your skills and enthusiasm.
        </p>
      </Col>
    </Container>
  </>
);

export default Landing;
