/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import { Container, Card, Button, ButtonGroup, Row, Col, Pagination, Image } from 'react-bootstrap';
import { TagFill } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import CommitToEvent from '../components/CommitToEvent';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import Event from '../components/Event';
import NotFound from './NotFound';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import EventCard from '../components/EventCard';
import EventList from '../components/EventList';

const MyEventPage = () => {
  const { ready, events } = useTracker(() => {
    // get current user
    const currentUser = Meteor.user();
    // check the user info
    if (!currentUser) {
      return {
        events: [],
        ready: false,
      };
    }
    // get access to events and userProfile
    const eventSubscription = Events.subscribeEvent();
    const userSubscription = UserProfiles.subscribeUser();
    // make sure its ready
    const rdy = eventSubscription.ready() && userSubscription.ready();
    // get user info
    const theUser = UserProfiles.findOne({ email: currentUser.username });
    // get the user's onGoing events
    const onGoingEvents = Array.isArray(theUser?.onGoingEvents) ? theUser.onGoingEvents : [];
    // fetch all events that the user is attending/registered for
    const userEvents = Events.find({ _id: { $in: onGoingEvents } }).fetch();
    return {
      events: userEvents,
      ready: rdy,
    };
  }, []);

  if (!ready) {
    // show a loading indicator or any placeholder content while the data is loading
    return <LoadingSpinner />;
  }

  // render the event cards once it is ready
  if (events.length > 0) {
    return (
      <Container>
        <Row className="justify-content-center text-center">
          <h1>Your Events</h1>
        </Row>
        <EventList theEvents={events} />
      </Container>
    );
  }

  // if not, render page not found
  return (
    <>
      <Container className="d-flex justify-content-center">
        <h2>You haven&apos;t registered for any events yet!</h2>
      </Container>
      <Container className="d-flex justify-content-center">
        <Button href="/Events">Go Find Events</Button>
      </Container>
    </>
  );
};

export default MyEventPage;
