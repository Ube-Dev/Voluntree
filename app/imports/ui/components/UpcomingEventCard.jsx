import React from 'react';
import { Card, Row, Col, Image, Button, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Events, eventPublications } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import '../css/UpComingEventCard.css';

const UpcomingEventCard = () => {
  const { ready, userProfile } = useTracker(() => {
    const currentUser = Meteor.user();
    const userProfileSubscription = currentUser ? UserProfiles.subscribeUser() : null;
    const userProfileData = currentUser ? UserProfiles.findOne({ userID: currentUser._id }) : null;
    const eventSubscription = Meteor.subscribe(eventPublications.event);
    return {
      ready: userProfileSubscription ? userProfileSubscription.ready() && eventSubscription.ready() : false,
      userProfile: userProfileData,
    };
  });

  return (
    ready ? (
      <Card className="rounded-4 my-2">
        <Card.Header>
          <h2>Upcoming Events</h2>
        </Card.Header>
        <Card.Body>
          {userProfile && userProfile.onGoingEvents && userProfile.onGoingEvents.length > 0 ? (
            userProfile.onGoingEvents.map((eventId) => {
              const event = Events.findOne({ _id: eventId });
              return event ? (
                <Container>
                  <Row key={eventId} className="event-border">
                    <Col xs={4} className="event-image">
                      <Image src={event.image} fluid className="rounded" />
                    </Col>
                    <Col xs={8} className="d-flex flex-column">
                      <p className="event-date m-0">{event.startTime.toLocaleDateString()} | {event.startTime.toLocaleTimeString()}</p>
                      <a className="event-title" href={`/view_event/${eventId}`}>{event.title}</a>
                    </Col>
                  </Row>
                </Container>
              ) : (<LoadingSpinner />);
            })
          ) : (
            <p className="py-4 text-center">Hmmm... No Events...</p>
          )}
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end p-2">
          <Button id={COMPONENT_IDS.UPCOMING_EVENT_CARD_FIND_EVENTS} className="justify-content-end commit-btn" href="/Events">Find Events
          </Button>
        </Card.Footer>
      </Card>
    ) : (
      <LoadingSpinner />
    )
  );
};

export default UpcomingEventCard;
