import React from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import '../css/AllEventPage.css';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Events } from '../../api/event/EventCollection';
import EventFilter from '../components/EventFilter';
import { MainCategory } from '../../api/category/MainCategoryCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const AllEventPage = () => {
  // apply filter to the entire page when a specific skill is clicked.
  // buttons inside <EventCard> will invoke this function.

  const { ready, events, categories } = useTracker(() => {
  // Get access to events
    const subscription = Events.subscribeEvent();
    const subscription2 = MainCategory.subscribeMainCategory();
    // Make sure its ready
    const rdy = subscription.ready() && subscription2.ready();
    // fetch all events and categories
    const theEvents = Events.find({}).fetch().reverse();
    const theCategories = MainCategory.find({}).fetch();
    return {
      events: theEvents,
      categories: theCategories,
      ready: rdy,
    };
  }, []);
  return ready ? (
    <Container id={PAGE_IDS.EVENTS}>
      <Row className="justify-content-center text-center">
        <h1 className="ps-5 ms-5">Find Events</h1>
        <br />
      </Row>
      <EventFilter event={events} categories={categories} />
      <Container className="text-center p-3">
        <h4>Need Volunteers?</h4>
        <Button variant="outline-primary" href="/createOrganization">Create An Organization</Button>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default AllEventPage;
