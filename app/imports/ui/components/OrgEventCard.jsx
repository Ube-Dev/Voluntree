import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';
import '../css/EventCard.css';

const EventCard = ({ event }) => (
  <Card key={event._id} className="h-100" style={{ maxHeight: '500px' }}>
    <Card.Header>
      <Card.Img variant="top" src={event.image} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
    </Card.Header>
    <Card.Body>
      <Card.Title>{event.title}</Card.Title>
      <Card.Text>{event.city}</Card.Text>
      <Card.Text className="event-description">{event.description}</Card.Text>
      <Row>
        <Col className="text-center">
          <Button href={`/view_event/${event._id}`}>View</Button>
        </Col>
        <Col className="text-center">
          <Button href={`/edit-event/${event._id}`}>Edit</Button>
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer>
      <Row>
        <Col className="text-start">
          <small>{event.startTime.toDateString()}</small>
        </Col>
        <Col className="text-end">
          <small>Seats: {event.spotsFilled.length}/{event.totalSpots}</small>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
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
    _id: PropTypes.string,
  }).isRequired,
};

export default EventCard;
