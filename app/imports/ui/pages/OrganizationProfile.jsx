import React from 'react';
import { Container, Button, Row, Col, Card, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Organization } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import '../css/OrganizationProfile.css';

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
  return orgProfile.hasPhysicalAddress ? (
    <Container id={PAGE_IDS.ORGANIZATION_PROFILE}>
      <Row className="py-5">
        <Col md={6}>
          <h1>{orgProfile.name}</h1>
          <Card className="d-flex justify-content-center">
            <Card.Body className="mt-2">
              <h5>Address: {orgProfile.address}</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Image src={orgProfile.image} className="org-profile-img" />
        </Col>
      </Row>
    </Container>
  ) : (
    <Container id={PAGE_IDS.ORGANIZATION_PROFILE}>
      <Row className="py-5">
        <Col md={2} />
        <Col md={3}>
          <h1>{orgProfile.name}</h1>
          <Image src={orgProfile.image} className="org-profile-img pb-4" />
        </Col>
        <Col md={5}>
          <Card className="d-flex justify-content-center">
            <Card.Body className="mt-2">
              <h5>Address: N/A</h5>
              <h5>Mission:</h5>
              <p>{orgProfile.mission}</p>
              <h5>Contact Email: {orgProfile.contactEmail}</h5>
              <h5>Phone: {orgProfile.phone}</h5>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" href={`/edit-organization-profile/${_id}`}>Edit</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrganizationProfile;
