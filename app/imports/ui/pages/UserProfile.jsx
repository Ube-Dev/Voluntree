import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';

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
    <Container>
      <Row className="py-5">
        <Col md={6}>
          <h1>Profile:</h1>
          <Card className="d-flex justify-content-center">
            <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile Picture" style={{ width: '250px' }} />
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <h3>Ongoing Events:</h3>
              <ul>
                {userProfile.onGoingEvents.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <h3>Past Events:</h3>
              <ul>
                {userProfile.pastEvents.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </Card.Body>
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
            </Card.Body>
            <Card.Footer>
              <Button className="btn btn-primary" href="/edit-user-profile">Edit</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
