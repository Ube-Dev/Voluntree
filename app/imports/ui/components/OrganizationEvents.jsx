import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventCard from './EventCard';
import

const OrganizationEvents = ({ org }) => (
  org ? (
    <Container>
      <Row>
        <Col>
          <EventCard event={org} />
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>
      <Row>
        <Col>
          <h2>No events found</h2>
        </Col>
      </Row>
    </Container>
  )
);

export default OrganizationEvents;
