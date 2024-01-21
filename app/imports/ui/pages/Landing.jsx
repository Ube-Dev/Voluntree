import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id={PAGE_IDS.LANDING} className="py-3">
    <Row className="align-middle text-center">
      <Col xs={12} className="d-flex flex-column justify-content-center">
        <h1>Welcome to Voluntree</h1>
        <p>Now get to work and modify this app!</p>
      </Col>

    </Row>
  </Container>
);

export default Landing;
