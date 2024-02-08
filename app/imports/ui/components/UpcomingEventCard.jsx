import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from './LoadingSpinner';

const UpcomingEventCard = () => {
  const { ready, userProfile } = useTracker(() => {
    const currentUser = Meteor.user();
    const subscription = currentUser ? UserProfiles.subscribeUser() : null;
    const profile = currentUser ? UserProfiles.findOne({ userID: currentUser._id }) : null;
    return {
      ready: subscription ? subscription.ready() : false,
      userProfile: profile,
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
            {userProfile.onGoingEvents.map(eventId => (
              <li key={eventId}>
                {/* eslint-disable-next-line no-restricted-globals */}
                <a href={`/view_event/${eventId}`}>{event.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="m-0">Hmmm... No Events...</p>
        )}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center p-2">
        <Button className="justify-content-center m-auto" style={{ backgroundColor: 'gold', color: 'black', border: 'none' }}>
          <a href="/Events" style={{ textDecoration: 'none', color: 'inherit', padding: '10px' }}>Find Events</a>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default UpcomingEventCard;
