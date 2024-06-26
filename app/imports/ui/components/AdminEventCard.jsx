import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import '../css/EventCard.css';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const AdminEventCard = ({ event }) => (
  <Card key={event._id} className="event-card rounded-4">
    <Card.Header>
      <Card.Img src={event.image} className="event-image rounded-3" />
    </Card.Header>
    <Card.Body>
      <Card.Title className="event-title">{event.title}</Card.Title>
      <hr />
      <Card.Text>{event.city}</Card.Text>
      <Card.Text className="event-description">{event.description}</Card.Text>
      <Link className="host-link" to={`/org-profile/${event.hostID}`}><Card.Text>{event.hostBy}</Card.Text></Link>
      <Row className="text-center pt-3">
        <Col>
          <Button variant="primary" href={`/view_event/${event._id}`} id={COMPONENT_IDS.ORG_EVENT_CARD_VIEW}>View</Button>
        </Col>
        <Col>
          <Button variant="primary" href={`/admin-edit-event/${event._id}`} id={COMPONENT_IDS.ORG_EVENT_CARD_EDIT}>Edit</Button>
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer>
      <Row className="event-footer">
        <Col className="text-start col-8">
          <small>{event.startTime.toDateString()} | {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</small>
        </Col>
        <Col className="text-end col-4">
          <small><PersonFill /> {event.spotsFilled.length}/{event.totalSpots}</small>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

AdminEventCard.propTypes = {
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

export default AdminEventCard;
