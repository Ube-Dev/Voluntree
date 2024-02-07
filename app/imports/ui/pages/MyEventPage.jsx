/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Container, Card, Button, ButtonGroup, Row, Col, Pagination, Image } from 'react-bootstrap';
import { TagFill } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import SearchBar from '../components/SearchBar';
import CommitToEvent from '../components/CommitToEvent';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import Event from '../components/Event';
import NotFound from './NotFound';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import EventCard from '../components/EventCard';

const MyEventPage = () => {
  // get event id
  const { ready, events } = useTracker(() => {
  // Get access to events and userProfile
    const eventSubscription = Events.subscribeEvent();
    const userSubscription = UserProfiles.subscribeUser();
    // Make sure its ready
    const rdy = eventSubscription.ready() && userSubscription.ready();
    // fetch all events
    const theEvents = Events.find({}).fetch();
    return {
      events: theEvents,
      ready: rdy,
    };
  }, []);
  if (ready) {
    if (events) {
      return <SearchBar />;
    }
    return <NotFound />;
  }
  return <LoadingSpinner />;
};

export default MyEventPage;
