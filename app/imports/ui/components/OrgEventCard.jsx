import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import '../css/EventCard.css';

const OrgEventCard = ({ event }) => (
  <Card key={event._id} className="event-card rounded-4">
    <Card.Header>
      <Card.Img src={event.image} className="event-image rounded-3" />
    </Card.Header>
    <Card.Body>
      <Card.Title className="event-title">{event.title}</Card.Title>
      <hr />
      <Card.Text>{event.city}</Card.Text>
      <Card.Text className="event-description">{event.description}</Card.Text>
      <Row>
        <Col className="text-center">
          <Button variant="primary" href={`/view_event/${event._id}`} id={COMPONENT_IDS.ORG_EVENT_CARD_VIEW}>View</Button>
        </Col>
        <Col className="text-center">
          <Button variant="primary" href={`/edit-event/${event._id}`} id={COMPONENT_IDS.ORG_EVENT_CARD_EDIT}>Edit</Button>
        </Col>
        <Col className="text-center">
          <Button variant="primary" href={`/scan-qr-code/${event._id}`} id={COMPONENT_IDS.ORG_EVENT_CARD_RECORD}>Record</Button>
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

OrgEventCard.propTypes = {
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

export default OrgEventCard;
