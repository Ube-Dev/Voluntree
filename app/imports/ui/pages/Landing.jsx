import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id={PAGE_IDS.LANDING} className="py-3">
    <Row className="align-middle text-center">
      <Col xs={12} className="d-flex flex-column justify-content-center">
        <Image src="/images/voluntree.png" alt="Voluntree Logo" className="mx-auto d-block" style={{ width: '45%' }} />
        <h1>Working together made simple</h1>
      </Col>
    </Row>
    <Row className="mb-5 g-0 justify-content-center">
      <Col xs="auto">
        <Button className="rounded-0" variant="outline-light-landing" size="lg" href="/signin">
          Sign In
        </Button>
        <Button className="rounded-0" variant="light" size="lg" href="/signup">
          Register
        </Button>
      </Col>
    </Row>
  </Container>
);

export default Landing;
