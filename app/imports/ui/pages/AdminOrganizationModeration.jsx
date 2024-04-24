import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Fuse from 'fuse.js';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Organization } from '../../api/organization/OrganizationCollection';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const AdminOrganizationModeration = () => {
  const { ready, organization } = useTracker(() => {
    const subscription = Organization.subscribeOrganization(); // Subscribe to organization publication for the current user
    const profile = Organization.find().fetch(); // Find the organization for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      organization: profile,
    };
  });

  let displayedOrganizations = organization;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchPerformed(true);
  };

  if (searchPerformed && searchQuery !== '') {
    const fuseOptions = {
      isCaseSensitive: false,
      shouldSort: true,
      includeMatches: true,
      findAllMatches: true,
      useExtendedSearch: false,
      threshold: 0.2,
      keys: ['name', 'location', 'category'],
    };

    const fuse = new Fuse(organization, fuseOptions);
    const result = fuse.search(searchQuery);
    displayedOrganizations = result.map((item) => item.item);
  }

  return ready ? (
    <Container fluid className="color2 py-5">
      <Container>
        <Row className="text-center pb-3">
          <h1>Organization Moderation</h1>
        </Row>
        <Row>
          <Form.Group className="search-bar">
            <Form.Control
              id={COMPONENT_IDS.ORGANIZATION_SEARCHBAR}
              type="text"
              placeholder="Search for organizations..."
              className="align-content-center"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Organization</th>
                      <th>Location</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedOrganizations.map((org) => (
                      <tr key={org._id}>
                        <td>{org.name}</td>
                        <td>{org.location}</td>
                        <td>{org.category}</td>
                        <td>Actions Placeholder</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default AdminOrganizationModeration;
