/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, Card, Button, ButtonGroup, Row, Col, Pagination } from 'react-bootstrap';
import { TagFill } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import EventList from '../components/EventList';
import '../css/AllEventPage.css';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Events } from '../../api/event/EventCollection';

const AllEventPage = () => {
  // apply filter to the entire page when a specific skill is clicked.
  // buttons inside <EventCard> will invoke this function.
  const filterSkill = (skill) => {
    // console.log('triggered');
  };

  const { ready, events } = useTracker(() => {
  // Get access to events
    const subscription = Events.subscribeEvent();
    // Make sure its ready
    const rdy = subscription.ready();
    // fetch all events
    const theEvents = Events.find({}).fetch();
    return {
      events: theEvents,
      ready: rdy,
    };
  }, []);
  return (
    <Container id={PAGE_IDS.EVENTS}>
      <Row className="justify-content-center text-center">
        <h1>Find Events</h1>
      </Row>
      <EventList theEvents={events} />
      <Container className="text-center p-3">
        <h4>Need Volunteers?</h4>
        <Button variant="outline-primary" href="/createOrganization">Create An Organization</Button>
      </Container>
    </Container>
  );
};

export default AllEventPage;
