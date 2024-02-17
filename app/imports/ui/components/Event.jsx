import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Bell, Calendar, GeoAlt } from 'react-bootstrap-icons';
import CommitToEvent from './CommitToEvent';

const Event = ({ event }) => (
  <Container id="view-event-page" className="py-3 d-flex">
    <Row className="justify-content-center pt-3">
      <Col>
        <Container>
          <Col>
            <h1>{event.title}</h1>
            <h5>Organization: {event.hostBy}</h5>
            <hr />
            <Col>
              <Image className="pt-5" src={event.image} width={600} style={{ objectFit: 'cover' }} />
              <h5 className="pt-3">{event.description}</h5>
            </Col>
          </Col>
        </Container>
      </Col>
      <Col>
        <Container className="pt-5">
          <Row className="pb-1">
            <h3><GeoAlt /> {event.location}</h3>
            <br />
          </Row>
          <Row className="pb-1">
            <h3><Calendar /> {event.time.toLocaleDateString()}</h3>
            <br />
          </Row>
          <Row className="pb-1">
            <h3><Bell /> Frequency: {event.frequency}</h3>
            <hr />
          </Row>
          <Row className="pb-1 pt-5">
            <h3>Accessible to: {event.accessibilities.join(', ')}</h3>
          </Row>
          <Row className="pb-1 pt-5">
            <h3>Required Skills: {event.requiredSkills.join(', ')}</h3>
          </Row>
          <Row className="pb-1 pt-5">
            <h3>Requires: {event.requirements.join(', ')}</h3>
          </Row>
          <Row className="pb-1 pt-5">
            <h3>Impact: {event.impact}</h3>
          </Row>
          <Row className="pb-1 pt-5">
            <CommitToEvent event={event} />
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
);

// Require a document to be passed to this component.
Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
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
