import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import '../css/EventCard.css';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => (
  <Card key={event._id} className="h-100" style={{ maxHeight: '475px' }}>
    <Card.Header>
      <Card.Img variant="top" src={event.image} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
    </Card.Header>
    <Card.Body>
      <Link to={`/view_event/${event._id}`}><Card.Title>{event.title}</Card.Title></Link>
      <Card.Body style={{ height: '150px', overflow: 'auto' }}>{event.description}</Card.Body>
    </Card.Body>
    <Card.Footer>
      <small>{event.time.toDateString()}</small>
    </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    time: PropTypes.instanceOf(Date),
    frequency: PropTypes.string,
    accessibilities: PropTypes.instanceOf(Array),
    requirements: PropTypes.instanceOf(Array),
    impact: PropTypes.string,
    eventPlanner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default EventCard;
