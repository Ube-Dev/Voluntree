import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Organization } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const OrganizationProfile = () => {
  const { _id } = useParams();

  const { ready, orgProfile } = useTracker(() => {
    const subscription = Organization.subscribeOrganization(); // Subscribe to organization publication
    const profile = Organization.findOne({ _id: _id }); // Query organization
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
          <h2>Org Profile</h2>
          <Card className="d-flex justify-content-center">
            <Card.Header>
              <h4>Organization Name: {orgProfile.name}</h4>
            </Card.Header>
            <Card.Body className="mt-2">
              <h5>Address: {orgProfile.address}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrganizationProfile;
