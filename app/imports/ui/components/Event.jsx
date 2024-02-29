import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Image, Row, Card } from 'react-bootstrap';
import { Bell, Calendar, GeoAlt } from 'react-bootstrap-icons';
import CommitToEvent from './CommitToEvent';

const Event = ({ event }) => (
  <Container id="view-event-page" className="py-3 d-flex">
    <Card className="rounded-4">
      <Container className="p-1">
        <Row className="justify-content-center pt-3">
          <Col>
            <Container>
              <Col>
                <h1>{event.title}</h1>
                <h5>Organization: {event.hostBy}</h5>
                <hr />
                <Col>
                  <Image className="pt-1 justify-content-center" src={event.image} width="500" />
                  <h5>{event.description}</h5>
                </Col>
              </Col>
            </Container>
          </Col>
          <Col>
            <Container className="pt-1">
              <Row className="pt-1">
                <h3><GeoAlt /> {event.address}, {event.zipCode}, {event.city}, {event.state}, {event.country}</h3>
                <br />
              </Row>
              <Row className="pt-1">
                <h3><Calendar /> {event.time.toLocaleDateString()}</h3>
                <br />
              </Row>
              <Row className="pt-1">
                <h3><Bell /> Frequency: {event.frequency}</h3>
              </Row>
              <Row className="pt-1">
                <h3>Accessible to:</h3>
                <h5>{event.accessibilities.join(', ')}</h5>
              </Row>
              <Row className="pt-1">
                <h3>Required Skills:</h3>
                <h5>{event.requiredSkills.join(', ')}</h5>
              </Row>
              <Row className="pt-1">
                <h3>Requires:</h3>
                <h5>{event.requirements.join(', ')}</h5>
              </Row>
              <Row className="pt-1">
                <h3>Impact:</h3>
                <h5>{event.impact}</h5>
              </Row>
              <Row className="p-1">
                <Col className="align-content-center justify-content-start center">
                  <CommitToEvent event={event} />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Card>
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
