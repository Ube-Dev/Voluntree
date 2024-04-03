import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';

const AdminDashboard = () => {
  const { ready, adminProfile } = useTracker(() => {
    const currentUser = Meteor.users.findOne({ _id: Meteor.userId() }); // Retrieve the current user
    const subscription = currentUser ? AdminProfiles.subscribeSingleUser(currentUser._id) : null; // Subscribe to adminProfile publication for the current user
    const profile = currentUser ? AdminProfiles.findOne({ userID: currentUser._id }) : null; // Query admin profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      adminProfile: profile,
    };
  });

  return (
    ready ? (
      <Container>
        <Card>
          <Card.Header>
            <h2>Admin Overview</h2>
          </Card.Header>
          <Card.Body className="d-flex flex-column align-items-start">
            <Row>
              <Col>
                <Image src="path_to_admin_placeholder_image.png" alt="Admin Image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} /> {/* Add placeholder profile image */}
              </Col>
              <Col>
                <h4>{adminProfile.firstName} {adminProfile.lastName}</h4>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end p-2" />
        </Card>
      </Container>
    ) : (
      <Container className="p-2">
        <LoadingSpinner />
      </Container>
    )
  );
};

export default AdminDashboard;
