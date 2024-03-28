import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from './LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const UserDashboard = () => {
  const { ready, userProfile } = useTracker(() => {
    const userSub = Meteor.subscribe('userData'); // Retrieve the current user

    const currentUser = userSub.ready() ? Meteor.users.findOne({ _id: Meteor.userId() }) : null;
    console.log(Meteor.users.find().fetch());
    const subscription = currentUser ? UserProfiles.subscribeSingleUser(currentUser.userID) : null; // Subscribe to userProfile publication for the current user
    console.log(UserProfiles.find().fetch());
    const profile = currentUser ? UserProfiles.findOne({ userID: currentUser.userID }) : null; // Query user profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      userProfile: profile,
    };
  });

  return (
    ready ? (
      <Container>
        <Card>
          <Card.Header>
            <h2>Overview</h2>
          </Card.Header>
          <Card.Body className="d-flex flex-column align-items-start">
            <Row>
              <Col>
                <Image src={userProfile.image} alt="Profile Image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
              </Col>
              <Col>
                <h4>{userProfile.firstName} {userProfile.lastName}</h4>
                <p>Hours Recorded: {userProfile.totalHours}</p>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end p-2">
            <Button id={COMPONENT_IDS.USER_DASHBOARD_VIEW_PROFILE} className="mx-1" style={{ backgroundColor: 'gold', color: 'black', border: 'none' }}>
              <a href="/profile" style={{ textDecoration: 'none', color: 'inherit', padding: '10px' }}>View Profile</a>
            </Button>
            <Button id={COMPONENT_IDS.USER_DASHBOARD_EDIT_PROFILE} className="mx-1" style={{ backgroundColor: 'gold', color: 'black', border: 'none' }}>
              <a href={`/edit-user-profile/${userProfile._id}`} style={{ textDecoration: 'none', color: 'inherit', padding: '10px' }}>Edit</a>
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    ) : (
      <Container className="p-2">
        <LoadingSpinner />
      </Container>
    )
  );
};

export default UserDashboard;
