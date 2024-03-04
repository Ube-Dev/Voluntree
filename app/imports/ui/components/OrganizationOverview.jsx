import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const OrganizationOverview = ({ organization }) => (
  organization ? (
    <Container>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Image src={organization.image} alt={organization.name} />
            </Col>
            <Col>
              <h3>{organization.name}</h3>
              <p>{organization.mission}</p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button className="btn btn-primary" href={`/edit-organization-profile/${organization._id}`}>Edit</Button>
        </Card.Footer>
      </Card>
    </Container>
  ) : (
    <Container className="p-2">
      <LoadingSpinner /> {/* Show loading spinner while data is loading */}
    </Container>
  ));

OrganizationOverview.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    mission: PropTypes.string,
    location: PropTypes.string,
    contact: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OrganizationOverview;
