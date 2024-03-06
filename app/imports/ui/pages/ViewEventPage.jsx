import React from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
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
