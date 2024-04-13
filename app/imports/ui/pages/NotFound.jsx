import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import GoBackButton from '../components/GoBackButton';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotFound = () => (
  <Container id={PAGE_IDS.NOT_FOUND} className="py-3">
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <h2>
          <p>Page not found</p>
        </h2>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col className="text-center">
        <GoBackButton />
      </Col>
    </Row>
  </Container>
);

export default NotFound;
