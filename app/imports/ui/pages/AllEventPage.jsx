import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
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
    <Container fluid className="color2">
      <Container fluid id={PAGE_IDS.EVENTS}>
        <Row className="justify-content-center">
          <Col className="col-11">
            <Row className="text-center py-4">
              <h1>Find Events</h1>
            </Row>
            <Row className="justify-content-center">
              <Card>
                <EventFilter event={events} categories={categories} />
              </Card>
            </Row>
            <Row className="justify-content-center p-3">
              <Col className="col-4">
                <Card>
                  <h4>Need Volunteers?</h4>
                  <Button variant="outline-primary" href="/createOrganization">Create An Organization</Button>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default AllEventPage;
