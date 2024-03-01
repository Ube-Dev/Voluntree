import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Image, Row, Card } from 'react-bootstrap';
import { Bell, Calendar, GeoAlt } from 'react-bootstrap-icons';
import '../css/EventPage.css';
import CommitToEvent from './CommitToEvent';

const Event = ({ event }) => (
  <Container fluid className="color2">
    <Container id="view-event-page" className="py-5 justify-content-center">
      <Card className="card">
        <Row>
          <Col md="auto" className="col-lg-6 col-sm-6">
            <Card.Body className="eventDetailsLeft">
              <h3>{event.title}</h3>
              <Image className="centeredImage" src={event.image} />
              <hr />
              <Card.Text><GeoAlt /> {event.address}, {event.city}, {event.state}, {event.zipCode}, {event.country}</Card.Text>
              <Card.Text><Calendar /> {event.time.toLocaleString()}</Card.Text>
              <Card.Text><Bell />Fequency: {event.frequency}</Card.Text>
            </Card.Body>
          </Col>
          <Col md="auto" className="col-lg-6 col-sm-6">
            <Card.Body className="eventDetailsRight">
              <Card.Text>Impact: {event.impact}</Card.Text>
              <hr />
              <Card.Text>{event.description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
        <Card.Footer>
          <Row>
            <Col>
              <Card.Text>Hosted by: {event.hostBy}</Card.Text>
            </Col>
            <Col>
              <CommitToEvent event={event} />
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  </Container>
);

// Require a document to be passed to this component.
Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    address: PropTypes.string,
    zipCode: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    time: PropTypes.instanceOf(Date),
    startTime: PropTypes.instanceOf(Date),
    frequency: PropTypes.string,
    accessibilities: PropTypes.instanceOf(Array),
    requiredSkills: PropTypes.instanceOf(Array),
    requirements: PropTypes.instanceOf(Array),
    impact: PropTypes.string,
    hostBy: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Event;
