import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Events, eventPublications } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';

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

  if (!ready) return <LoadingSpinner />;

  return (
    <Card className="w-100 h-100 my-1">
      <Card.Header>
        <h2>Upcoming Events</h2>
      </Card.Header>
      <Card.Body className="d-flex justify-content-start align-items-start p-2">
        {userProfile && userProfile.onGoingEvents && userProfile.onGoingEvents.length > 0 ? (
          <ul>
            {userProfile.onGoingEvents.map(eventId => {
              const event = Events.findOne({ _id: eventId });
              return event ? (
                <li key={eventId}>
                  <Container><a href={`/view_event/${eventId}`}>{event.title}</a>
                    <div className="py-2">{event.startTime.toLocaleString()}</div>
                  </Container>
                </li>
              ) : null;
            })}
          </ul>
        ) : (
          <p className="m-0">Hmmm... No Events...</p>
        )}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end p-2">
        <Button className="justify-content-end" style={{ backgroundColor: 'gold', color: 'black', border: 'none' }}>
          <a href="/Events" style={{ textDecoration: 'none', color: 'inherit', padding: '10px' }}>Find Events</a>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default UpcomingEventCard;
