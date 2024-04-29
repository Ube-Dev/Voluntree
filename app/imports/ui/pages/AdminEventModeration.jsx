import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import { MainCategory } from '../../api/category/MainCategoryCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import '../css/AllEventPage.css';
import AdminEventFilter from '../components/AdminEventFilter';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminEventModeration = () => {

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
    <Container fluid className="color1" id={PAGE_IDS.ADMIN_EVENT_MODERATION}>
      <Container className="py-5">
        <Row className="text-center pb-4">
          <h1>Event Moderation</h1>
        </Row>
        <Row>
          <Col>
            <Card className="all-event-card-background rounded-4 py-5">
              <AdminEventFilter event={events} categories={categories} />
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default AdminEventModeration;
