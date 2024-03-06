import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Organization } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const OrganizationProfile = () => {
  const { ready, orgProfile } = useTracker(() => {
    const currentUser = Meteor.user(); // Retrieve the current user
    const subscription = currentUser ? Organization.subscribeOrganization() : null; // Subscribe to organization publication
    const profile = currentUser ? Organization.findOne({ userID: currentUser._id }) : null; // Query organization for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      orgProfile: profile,
    };
  });

  if (!ready) {
    return (
      <Container className="p-2">
        <LoadingSpinner /> {/* Show loading spinner while data is loading */}
      </Container>
    );
  }

  // Once data is ready, render the organization profile
  return (
    <Container id={PAGE_IDS.ORGANIZATION_PROFILE}>
      <Row className="py-5">
        <Col md={6}>
          <h4>Org Profile</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default OrganizationProfile;
