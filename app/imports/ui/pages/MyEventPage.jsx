import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from '../components/LoadingSpinner';
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

  if (!ready) {
    // show a loading indicator or any placeholder content while the data is loading
    return <LoadingSpinner />;
  }

  // render the event cards once it is ready
  if (events.length > 0) {
    return (
      <Container>
        <Row className="justify-content-center text-center">
          <h1 className="ps-5 ms-5">Your Events</h1>
          <br />
        </Row>
        <EventFilter event={events} categories={categories} />
      </Container>
    );
  }

  // if not, render a button for the user to find events
  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <h2>You haven&apos;t registered for any events yet!</h2>
      </Container>
      <Container className="d-flex justify-content-center mt-5">
        <Button style={{ backgroundColor: 'gold', color: 'black', border: 'none' }} href="/Events">Go Find Events</Button>
      </Container>
    </>
  );
};

export default MyEventPage;
