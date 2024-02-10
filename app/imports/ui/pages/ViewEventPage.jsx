/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Container, Card, Button, ButtonGroup, Row, Col, Pagination, Image } from 'react-bootstrap';
import { TagFill } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import EventList from '../components/EventList';
import CommitToEvent from '../components/CommitToEvent';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import Event from '../components/Event';
import NotFound from './NotFound';

const ViewEventPage = () => {
  // get event id
  const _id = useParams();
  const { ready, events } = useTracker(() => {
  // Get access to events
    const subscription = Events.subscribeEvent();
    // Make sure its ready
    const rdy = subscription.ready();
    // fetch all events
    const theEvents = Events.findOne(_id);
    return {
      events: theEvents,
      ready: rdy,
    };
  }, []);
  if (ready) {
    if (events) {
      return <Event event={events} />;
    }
    return <NotFound />;
  }
  return <LoadingSpinner />;
};

export default ViewEventPage;
