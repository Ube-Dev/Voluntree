import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import OrganizationEvents from './OrganizationEvents';
// import OrganizationStats from './OrganizationStats';

const OrganizationOverview = ({ theOrganization }) => (
  theOrganization ? (
    <Container>
      <Card>
        <Card.Body>
          <Row>
            <Col className="col-md-3">
              <Image src={theOrganization.image} alt={theOrganization.name} />
            </Col>
            <Col className="col-md-9">
              <h3>{theOrganization.name}</h3>
              <hr />
              <h5>Mission:</h5>
              <p>{theOrganization.mission}</p>
              <h5>Location:</h5>
              <p>{theOrganization.hasPhysicalAddress ? theOrganization.address : 'N/A'}</p>
              {theOrganization.hasPhysicalAddress && (
                <p>{theOrganization.address}, {theOrganization.zipCode}, {theOrganization.city}, {theOrganization.state}, {theOrganization.country}</p>
              )}
              <Row>
                <Col>
                  <h5>Contact Email:</h5>
                  <p>{theOrganization.contactEmail}</p>
                </Col>
                <Col>
                  <h5>Phone:</h5>
                  <p>{theOrganization.phone}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button className="btn btn-primary" href={`/edit-organization-profile/${theOrganization._id}`}>Edit</Button>
        </Card.Footer>
      </Card>
      <Row>
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
