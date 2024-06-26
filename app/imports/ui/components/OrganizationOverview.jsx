import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import '../css/OrgDashboard.css';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import OrganizationEvents from './OrganizationEvents';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import OrganizationStats from './OrganizationStats';

const OrganizationOverview = ({ theOrganization }) => (
  theOrganization ? (
    <Container>
      <Card className="rounded-4">
        <Card.Body>
          <Row>
            <Col sm={12} md={3} className="align-content-center text-center">
              <Image className="org-overview-image" src={theOrganization.image} alt={theOrganization.name} />
            </Col>
            <Col sm={12} md={9}>
              <h2 id={COMPONENT_IDS.ORGANIZATION_OVERVIEW_ORG_NAME}>{theOrganization.name}</h2>
              <hr />
              <h5>Mission:</h5>
              <p>{theOrganization.mission}</p>
              <h5>Location:</h5>
              {theOrganization.hasPhysicalAddress ? (
                <p>{theOrganization.address}, {theOrganization.zipCode}, {theOrganization.city}, {theOrganization.state}, {theOrganization.country}</p>
              ) : (<p>N/A</p>)}
              <Row>
                <Col sm={12} md={6}>
                  <h5>Contact Email:</h5>
                  {theOrganization.contactEmail ? (
                    <p id={COMPONENT_IDS.ORGANIZATION_OVERVIEW_CONTACT_EMAIL}>{theOrganization.contactEmail}</p>
                  ) : (<p id={COMPONENT_IDS.ORGANIZATION_OVERVIEW_CONTACT_EMAIL}>N/A</p>)}
                </Col>
                <Col sm={12} md={6}>
                  <h5>Phone:</h5>
                  {theOrganization.phone ? (
                    <p id={COMPONENT_IDS.ORGANIZATION_OVERVIEW_PHONE}>{theOrganization.phone}</p>
                  ) : (<p id={COMPONENT_IDS.ORGANIZATION_OVERVIEW_PHONE}>N/A</p>)}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button className="btn-primary" href={`/org-profile/org-view/${theOrganization._id}`} id={COMPONENT_IDS.ORGANIZATION_OVERVIEW_VIEW_PROFILE}>
            View More
          </Button>
          <Button className="mx-2 btn-primary" href={`/edit-organization-profile/${theOrganization._id}`} id={COMPONENT_IDS.ORGANIZATION_OVERVIEW_EDIT_PROFILE}>
            Edit
          </Button>
        </Card.Footer>
      </Card>
      <Row>
        <h1 className="text-center org-text-white pt-3">Organization Stats</h1>
        <OrganizationStats />
      </Row>
      <Row>
        <h1 className="text-center org-text-white pt-3 ">Organization Events</h1>
        <OrganizationEvents org={theOrganization} />
      </Row>
    </Container>
  ) : (
    <Container className="p-2">
      <LoadingSpinner /> {/* Show loading spinner while data is loading */}
    </Container>
  ));

OrganizationOverview.propTypes = {
  theOrganization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    mission: PropTypes.string,
    hasPhysicalAddress: PropTypes.bool.isRequired,
    address: PropTypes.string,
    zipCode: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    contactEmail: PropTypes.string,
    phone: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OrganizationOverview;
