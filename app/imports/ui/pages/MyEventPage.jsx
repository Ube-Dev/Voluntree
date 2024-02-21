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
    // Get the current user
    const currentUser = Meteor.user();
    if (!currentUser) {
      return {
        events: [],
        ready: false,
      };
    }

    // Subscribe to events and userProfile
    const eventSubscription = Events.subscribeEvent();
    const userSubscription = UserProfiles.subscribeUser();
    const rdy = eventSubscription.ready() && userSubscription.ready();

    // Get user info
    const theUser = UserProfiles.findOne({ email: currentUser.username });
    // Ensure onGoingEvents is an array
    const onGoingEvents = Array.isArray(theUser?.onGoingEvents) ? theUser.onGoingEvents : [];
    // Fetch all events that the user is attending/registered for
    const userEvents = Events.find({ _id: { $in: onGoingEvents } }).fetch();

    return {
      events: userEvents,
      ready: rdy,
    };
  }, []);

  // Show a loading indicator or any placeholder content while the data is loading
  if (!ready) {
    return <LoadingSpinner />;
  }

  // Render the event cards once it is ready
  if (events && events.length > 0) {
    return (
      <Container>
        {events.map(event => (
          <EventCardWithActions key={event._id} event={event} />
        ))}
      </Container>
    );
  }

  // If not, render page not found
  return <NotFound />;
};

export default MyEventPage;


/*
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
    // Get access to events and userProfile
    const eventSubscription = Events.subscribeEvent();
    const userSubscription = UserProfiles.subscribeUser();
    // Make sure its ready
    const rdy = eventSubscription.ready() && userSubscription.ready();
    // get user info
    const theUser = UserProfiles.findOne({ email: currentUser.username });
    // get the user's onGoing events
    const onGoingEvents = theUser ? theUser.onGoingEvents : [];
    // fetch all events that the user is attending/registered for
    const userEvents = Events.find({ _id: { $in: onGoingEvents } }).fetch();
    return {
      events: userEvents,
      ready: rdy,
    };
  }, []);

  if (!ready) {
    // Show a loading indicator or any placeholder content while the data is loading
    return <LoadingSpinner />;
  }

  // render the event cards once it is ready
  if (events && events.length > 0) {
    return <EventList theEvents={events} />;
  }
  // if not, render page not found
  return <NotFound />;
};

export default MyEventPage;
 */
