import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const OrganizationOverview = ({ organization }) => (
  organization ? (
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
      <LoadingSpinner /> {/* Show loading spinner while data is loading */}
    </Container>
  ));

OrganizationOverview.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
    contact: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OrganizationOverview;
