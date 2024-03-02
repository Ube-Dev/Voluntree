import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Image, Row, Card } from 'react-bootstrap';
import { Bell, Calendar, GeoAlt, People } from 'react-bootstrap-icons';
import '../css/EventPage.css';
import CommitToEvent from './CommitToEvent';

const Event = ({ event }) => (
  <Container fluid className="color1">
    <Container id="view-event-page" className="py-5 justify-content-center">
      <Card className="pageCard">
        <Card.Header className="pageCardHeader">
          <h1>{event.title}</h1>
        </Card.Header>
        <Row>
          <Col md="auto" className="col-lg-6 col-sm-6 my-auto">
            <Card.Body>
              <Image className="pageCardImage" src={event.image} />
            </Card.Body>
            <Card.Body className="eventDetailsLeft">
              <h5>Host: {event.hostBy}</h5>
              <hr />
              <h5><GeoAlt /> {event.address}, {event.city}, {event.state}, {event.zipCode}, {event.country}</h5>
              <h5><Calendar /> {event.time.toLocaleString()}</h5>
              <h5><Bell /> Frequency: {event.frequency}</h5>
              <h5><People /> Seats: {event.spotsFilled.length}/{event.totalSpots}</h5>
            </Card.Body>
          </Col>
          <Col md="auto" className="col-lg-6 col-sm-6 my-auto">
            <Card.Body className="eventDetailsRight">
              <h5>Description:</h5>
              <p>{event.description}</p>
              <hr />
              <h5>Impact:</h5>
              <p>{event.impact}</p>
            </Card.Body>
            <Card.Body className="eventDetailsRight">
              <h5>Requirements:</h5>
              <p>{event.requirements.join(', ')}</p>
              <hr />
              <h5>Needed Skills:</h5>
              <p>{event.requiredSkills.join(', ')}</p>
              <hr />
              <h5>Accessibilities:</h5>
              <p>{event.accessibilities.join(', ')}</p>
            </Card.Body>
          </Col>
        </Row>
        <Card.Footer className="pageCardFooter">
          <CommitToEvent event={event} />
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
    totalSpots: PropTypes.number,
    spotsFilled: PropTypes.instanceOf(Array),
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
