import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Organization } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from './LoadingSpinner';

const UserDashboard = () => {
  const { ready, organization } = useTracker(() => {
    const currentUser = Meteor.user(); // Retrieve the current user
    const subscription = currentUser ? Organization.subscribeOrganization() : null; // Subscribe to organization publication for the current user
    const profile = currentUser ? Organization.findOne({ userID: currentUser._id }) : null; // Query user profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      organization: profile,
    };
  });

  return (
    ready ? (
      <Container>
        <Card>
          <Card.Header>
            <h2>Overview</h2>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <h4>{organization.name}</h4>
              </Col>
            </Row>
          </Card.Body>
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
