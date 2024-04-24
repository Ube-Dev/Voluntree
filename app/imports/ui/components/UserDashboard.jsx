import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from './LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import SkillChooserModal from './SkillChooserModal';

// This component displays the user's dashboard, which includes their profile picture, name, and total hours recorded.
// It also includes buttons to view and edit the user's profile, as well as to log hours.

const UserDashboard = () => {
  const { ready, userProfile } = useTracker(() => {
    const currentUser = Meteor.user(); // Retrieve the current user
    const subscription = currentUser ? UserProfiles.subscribeSingleUser(currentUser._id) : null;
    const profile = currentUser ? UserProfiles.findOne({ userID: currentUser._id }) : null;
    return {
      ready: subscription ? subscription.ready() : false,
      userProfile: profile,
    };
  });

  return ready ? (
    <Container>
      <Card>
        <Card.Header>
          <h2>Overview</h2>
        </Card.Header>
        <Card.Body className="d-flex flex-column align-items-start">
          <Row>
            <Col>
              <Image src={userProfile?.image || '/path/to/default/profile/image.png'} alt="Profile Image" id="profile-img" />
            </Col>
            <Col>
              <h4>{userProfile.firstName} {userProfile.lastName}</h4>
              <p>Hours Recorded: {userProfile.totalHours}</p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="p-2">
          <Row>
            <Col className="text-start">
              <Button id={COMPONENT_IDS.USER_DASHBOARD_VIEW_PROFILE} className="mx-1" href="/profile">View Profile</Button>
              <Button id={COMPONENT_IDS.USER_DASHBOARD_EDIT_PROFILE} className="mx-1" href={`/edit-user-profile/${userProfile?._id}`}>Edit</Button>
            </Col>
            <Col className="text-end">
              <Button id={COMPONENT_IDS.USER_DASHBOARD_VIEW_QR_CODE} className="mx-1" href={`/qr-code/${userProfile?._id}`}>Log Hours</Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default UserDashboard;
