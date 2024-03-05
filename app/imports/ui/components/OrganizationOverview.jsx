import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const OrganizationOverview = ({ theOrganization }) => (
  theOrganization ? (
    <Container>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Image src={theOrganization.image} alt={theOrganization.name} />
            </Col>
            <Col>
              <h3>{theOrganization.name}</h3>
              <p>{theOrganization.mission}</p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button className="btn btn-primary" href={`/edit-organization-profile/${theOrganization._id}`}>Edit</Button>
        </Card.Footer>
      </Card>
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
    location: PropTypes.string,
    contactEmail: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OrganizationOverview;
