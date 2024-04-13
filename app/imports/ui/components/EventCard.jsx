import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import '../css/EventCard.css';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => (
  <Link className="text-decoration-none" to={`/view_event/${event._id}`}>
    <Card key={event._id} className="h-200 event-card rounded-4">
      <Card.Header>
        <Card.Img src={event.image} className="event-image rounded-3" />
      </Card.Header>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.city}</Card.Text>
        <Card.Text className="event-description">{event.description}</Card.Text>
        <Link className="host-link" to={`/org-profile/${event.hostID}`}><Card.Text>{event.hostBy}</Card.Text></Link>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col className="text-start col-8">
            <small>{event.startTime.toDateString()} | {event.startTime.toLocaleTimeString()}</small>
          </Col>
          <Col className="text-end col-4">
            <small>Seats: {event.spotsFilled.length}/{event.totalSpots}</small>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  </Link>
);

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
    startTime: PropTypes.instanceOf(Date),
    time: PropTypes.instanceOf(Date),
    totalSpots: PropTypes.number,
    spotsFilled: PropTypes.instanceOf(Array),
    frequency: PropTypes.string,
    accessibilities: PropTypes.instanceOf(Array),
    requirements: PropTypes.instanceOf(Array),
    impact: PropTypes.string,
    hostBy: PropTypes.string,
    hostID: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default EventCard;
