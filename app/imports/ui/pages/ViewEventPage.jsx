import React from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import { Organization } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import Event from '../components/Event';
import NotFound from './NotFound';
import { PAGE_IDS } from '../utilities/PageIDs';

const ViewEventPage = () => {
  // get event id
  const _id = useParams();
  const { ready, events } = useTracker(() => {
  // Get access to events
    const subscription = Events.subscribeEvent();
    // get access to organizations to be passed in for email
    const subscription2 = Organization.subscribeOrganization();
    // Make sure its ready
    const rdy = subscription.ready() && subscription2.ready();
    // fetch all events
    const theEvents = Events.findOne(_id);
    return {
      events: theEvents,
      ready: rdy,
    };
  }, []);
  if (ready) {
    if (events) {
      // fetch the right organization
      const theOrg = Organization.findOne({ name: events.hostBy });
      console.log(theOrg);
      return <Event event={events} org={theOrg} id={PAGE_IDS.VIEW_EVENT} />;
    }
    return <NotFound />;
  }
  return <LoadingSpinner />;
};

export default ViewEventPage;
