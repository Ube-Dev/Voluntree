import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import '../css/AllEventPage.css';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { MainCategory } from '../../api/category/MainCategoryCollection';
import EventFilter from '../components/EventFilter';

const MyEventPage = () => {
  const { ready, events, categories } = useTracker(() => {
    // get current user
    const currentUser = Meteor.user();
    // check the user info
    if (!currentUser) {
      return {
        events: [],
        ready: false,
      };
    }
    // get access to events, userProfile, and main categories
    const eventSubscription = Events.subscribeEvent();
    const userSubscription = UserProfiles.subscribeUser();
    const categorySubscription = MainCategory.subscribeMainCategory();
    // make sure its ready
    const rdy = eventSubscription.ready() && userSubscription.ready() && categorySubscription.ready();
    // get user info
    const theUser = UserProfiles.findOne({ email: currentUser.username });
    // get the user's onGoing events
    const onGoingEvents = Array.isArray(theUser?.onGoingEvents) ? theUser.onGoingEvents : [];
    // fetch all events that the user is attending/registered for
    const userEvents = Events.find({ _id: { $in: onGoingEvents } }).fetch();
    // fetch all the main categories
    const theCategories = MainCategory.find({}).fetch();
    return {
      events: userEvents,
      ready: rdy,
      categories: theCategories,
    };
  }, []);

  // if not, render a button for the user to find events
  return ready ? (
    <Container fluid className="color1" id={PAGE_IDS.MY_EVENTS_PAGE}>
      <Container fluid className="mb-5">
        <Row className="justify-content-center">
          <Col className="col-11">
            <Row className="text-center py-4">
              <h1>Your Events</h1>
            </Row>
            <Row className="justify-content-center">
              <Card className="rounded-4 py-5 all-event-card-background">
                {events.length > 0 ? (
                  <EventFilter event={events} categories={categories} />
                ) : (
                  <>
                    <Row className="text-center py-5 text-color">
                      <h2>No events? Let&apos;s help out!</h2>
                    </Row>
                    <Row className="justify-content-center py-3">
                      <Col md={3} className="text-center">
                        <Button href="/Events">Go Find Events</Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default MyEventPage;
