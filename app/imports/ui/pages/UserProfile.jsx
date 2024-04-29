import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import '../css/UserProfile.css';
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
    <Container fluid className="color1" id={PAGE_IDS.USER_PROFILE}>
      <Container className="mb-5">
        <Row className=" py-1 text-start">
          <Col className="py-2 col-3">
            <GoBackButton />
          </Col>
          <h1 className="text-center">{userProfile.firstName}&apos;s Profile</h1>
        </Row>
        <Row className="py-1">
          <Col sm={12} md={6}>
            <Card className="rounded-4">
              <Row>
                <Col sm={12} md={5}>
                  <Image src={userProfile.image} alt="Profile Picture" className="user-image" />
                </Col>
                <Col sm={12} md={7} className="py-2 px-3">
                  <h3>{userProfile.firstName} {userProfile.lastName}</h3>
                  <h5>Hours Recorded: {userProfile.totalHours}</h5>
                </Col>
              </Row>
            </Card>
            <UpcomingEventCard />
            <Card className="rounded-4 my-2">
              <Card.Header>
                <h3>Past Events</h3>
              </Card.Header>
              <Card.Body>
                {userProfile.pastEvents.length === 0 ? (
                  <Row className="py-4 text-center">
                    <p>What... No Past?</p>
                  </Row>
                ) : (
                  <ul>
                    {userProfile.pastEvents.map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                )}
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end p-2">
                <Button className="justify-content-end" href="/my_event">View More</Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col sm={12} md={6}>
            <Card className="rounded-4">
              <Card.Header>
                <h3>Basic Information</h3>
              </Card.Header>
              <Card.Body>
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
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default UserProfile;
