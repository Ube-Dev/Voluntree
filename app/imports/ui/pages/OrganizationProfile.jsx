import React from 'react';
import { Container, Button, Row, Col, Card, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Organization } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import '../css/OrganizationProfile.css';
import OrganizationEvents from '../components/OrganizationEvents';
import GoBackButton from '../components/GoBackButton';

/** Organization profile page which can only be viewed by org owner. */
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

  // Once data is ready, render the organization profile
  return ready ? (
    <Container fluid id={PAGE_IDS.ORGANIZATION_PROFILE} className="px-2 py-5 color1">
      <Row className="px-3">
        <Col sm={1} md={1} />
        <Col sm={1} md={1}>
          <GoBackButton />
        </Col>
        <Col sm={8} md={8}>
          <h1 className="text-center pb-2">Organization Profile (Org View)</h1>
        </Col>
        <Col sm={2} md={2} />
      </Row>
      <Container className="my-3 rounded-4 color2">
        <Row className="py-4">
          <Col sm={12} md={1} />
          <Col sm={12} md={3} className="text-center">
            <h2>{orgProfile.name}</h2>
            <Image src={orgProfile.image} className="org-profile-img rounded mb-4" />
          </Col>
          <Col sm={12} md={7}>
            <Card className="d-flex justify-content-center">
              <Card.Header>
                <h3>Organization Details</h3>
              </Card.Header>
              <Card.Body className="mt-2">
                <h5>Mission:</h5>
                {orgProfile.mission ? (
                  <p>{orgProfile.mission}</p>
                ) : (<p>N/A</p>)}
                <h5>Location:</h5>
                {orgProfile.hasPhysicalAddress ? (
                  <p>{orgProfile.address}, {orgProfile.city}, {orgProfile.state}, {orgProfile.country} {orgProfile.zipCode}</p>
                ) : (<p>N/A</p>)}
                <Row>
                  <Col>
                    <h5>Contact Email:</h5>
                    {orgProfile.contactEmail ? (
                      <p>{orgProfile.contactEmail}</p>
                    ) : (<p>N/A</p>)}
                  </Col>
                  <Col>
                    <h5>Phone:</h5>
                    {orgProfile.phone ? (
                      <p>{orgProfile.phone}</p>
                    ) : (<p>N/A</p>)}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" href={`/edit-organization-profile/${_id}`} id={COMPONENT_IDS.ORGANIZATION_PROFILE_EDIT_PROFILE}>Edit</Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col sm={12} md={1} />
        </Row>
      </Container>
      <Container className="my-3 rounded-4 color2">
        <Row className="py-3">
          <Col sm={12} md={1} />
          <Col sm={12} md={10}>
            <h1 className="text-center">Events Organized by {orgProfile.name}</h1>
            <OrganizationEvents org={orgProfile} />
          </Col>
          <Col sm={12} md={1} />
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default OrganizationProfile;
