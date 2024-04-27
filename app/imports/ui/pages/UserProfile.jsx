import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import UpcomingEventCard from '../components/UpcomingEventCard';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import GoBackButton from '../components/GoBackButton';

const UserProfile = () => {
  const { ready, userProfile } = useTracker(() => {
    const currentUser = Meteor.users.findOne({ _id: Meteor.userId() });
    const subscription = currentUser ? UserProfiles.subscribeSingleUser(currentUser._id) : null; // Subscribe to userProfile publication for the current user
    // console.log(UserProfiles.find().fetch());
    const profile = currentUser ? UserProfiles.findOne({ userID: currentUser._id }) : null; // Query user profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      userProfile: profile,
    };
  });

  // Once data is ready, render the user profile
  return ready ? (
    <Container id={PAGE_IDS.USER_PROFILE}>
      <Row className=" py-2 text-start">
        <Col className="col-3">
          <GoBackButton />
        </Col>
      </Row>
      <Row className="py-1">
        <h1>{userProfile.firstName}&apos;s Profile:</h1>
        <Col md={6}>
          <Card className="d-flex justify-content-center">
            <Image src={userProfile.image} alt="Profile Picture" style={{ width: '250px' }}/>
          </Card>
          <Card.Body className="mt-3">
            <UpcomingEventCard/>
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
              <Button className="justify-content-end" href="/Events">Past Events</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={6}>
          <h1>{userProfile.firstName} {userProfile.lastName}</h1>
          <Card>
            <Card.Body>
              <h3>Basic Information:</h3>
              <br/>
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
              <Button id={COMPONENT_IDS.USER_PROFILE_EDIT_PROFILE} className="btn btn-primary justify-content-start" href={`/edit-user-profile/${userProfile._id}`}>Edit</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner/>
  );
};

export default UserProfile;
