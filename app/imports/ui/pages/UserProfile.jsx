import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import UpcomingEventCard from '../components/UpcomingEventCard';
import { PAGE_IDS } from '../utilities/PageIDs';

const UserProfile = () => {
  const { ready, userProfile } = useTracker(() => {
    const currentUser = Meteor.user(); // Retrieve the current user
    const subscription = currentUser ? UserProfiles.subscribeUser() : null; // Subscribe to userProfile publication for the current user
    const profile = currentUser ? UserProfiles.findOne({ userID: currentUser._id }) : null; // Query user profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      userProfile: profile,
    };
  });

  if (!ready) {
    return (
      <Container className="p-2">
        <LoadingSpinner /> {/* Show loading spinner while data is loading */}
      </Container>
    );
  }

  // Once data is ready, render the user profile
  return (
    <Container id={PAGE_IDS.USER_PROFILE}>
      <Row className="py-5">
        <Col md={6}>
          <h1>Profile:</h1>
          <Card className="d-flex justify-content-center">
            <Image src={userProfile.image} alt="Profile Picture" style={{ width: '250px' }} />
          </Card>
          <Card.Body className="mt-3">
            <UpcomingEventCard />
          </Card.Body>
          <Card className="mt-3">
            <Card.Header>
              <h3>Past Events:</h3>
            </Card.Header>
            <Card.Body>
              <ul>
                {userProfile.pastEvents.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end p-2">
              <Button className="justify-content-end" style={{ backgroundColor: 'gold', color: 'black', border: 'none' }}>
                <a href="/Events" style={{ textDecoration: 'none', color: 'inherit', padding: '10px' }}>Past Events</a>
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={6}>
          <h1>{userProfile.firstName} {userProfile.lastName}</h1>
          <Card>
            <Card.Body>
              <h3>Basic Information:</h3>
              <br />
              <h4>Email:</h4>
              <p>{userProfile.email}</p>
              <h4>Phone Number:</h4>
              <p>{userProfile.phone}</p>
              <h4>Skills:</h4>
              <p>{userProfile.skills.join(', ')}</p>
              <h4>Address:</h4>
              <p>{userProfile.address}</p>
            </Card.Body>
            <Card.Footer>
              <Button style={{ backgroundColor: 'gold', color: 'black', border: 'none' }} className="btn btn-primary justify-content-start" href={`/edit-user-profile/${userProfile._id}`}>Edit</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
