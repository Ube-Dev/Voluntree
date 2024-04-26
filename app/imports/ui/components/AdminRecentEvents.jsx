import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';
import EventCard from './EventCard';

const AdminRecentEvents = () => {

  const { ready, recentEvents } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const recent = Events.find({}).fetch().reverse().slice(0, 6);
    return {
      ready: subscription.ready(),
      recentEvents: recent,
    };
  });

  return ready ? (
    <Container className="py-3">
      <Row className="text-center">
        <h2>Recent Events</h2>
      </Row>
      <Row className="p-3">
        {recentEvents.map((item) => (
          <Col key={item._id} md={4} className="py-2">
            <EventCard event={item} />
          </Col>
        ))}
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default AdminRecentEvents;
