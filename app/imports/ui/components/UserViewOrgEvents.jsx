import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import propTypes from 'prop-types';
import { Events } from '../../api/event/EventCollection';
import EventCard from './EventCard';
import LoadingSpinner from './LoadingSpinner';

const UserViewOrgEvents = ({ org }) => {
  const { ready, event } = useTracker(() => {
    const subscription = Events.subscribeEvent(); // Subscribe to Event publication for the current user
    const orgEvent = Events.find({ hostBy: org.name }).fetch(); // Query events hosted by the organization
    return {
      ready: subscription ? subscription.ready() : false,
      event: orgEvent,
    };
  });

  return ready ? (
    <Container>
      <Row className="p-3">
        {event.map((item) => (
          <Col key={item._id} md={4} className="py-2">
            <EventCard event={item} />
          </Col>
        ))}
      </Row>
    </Container>
  ) : (
    <Container className="p-2">
      <LoadingSpinner />
    </Container>
  );
};

UserViewOrgEvents.propTypes = {
  org: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
};

export default UserViewOrgEvents;
