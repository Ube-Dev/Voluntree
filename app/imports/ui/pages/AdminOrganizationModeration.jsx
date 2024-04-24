import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ButtonGroup } from 'react-bootstrap';
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
      keys: ['name', 'type'],
    };

    const fuse = new Fuse(organization, fuseOptions);
    const result = fuse.search(searchQuery);
    displayedOrganizations = result.map((item) => item.item);
  }

  return ready ? (
    <Container fluid className="color1 py-5">
      <Container>
        <Row className="text-center pb-3">
          <h1>Organization Moderation</h1>
        </Row>
        <Card className="rounded-4 p-3">
          <Row className="justify-content-center">
            <Col className="col-7">
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
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Organization</th>
                      <th>Category</th>
                      <th>Email</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedOrganizations.map((org) => (
                      <tr key={org._id}>
                        <td>{org.name}</td>
                        <td>{org.type}</td>
                        <td>{org.contactEmail}</td>
                        <td>{org.averageRating}</td>
                        <td className="text-center">
                          <ButtonGroup>
                            <Button variant="success" href={`/org-profile/${org._id}`}>View</Button>
                            <Button variant="warning" href={`/admin-edit-organization/${org._id}`}>Edit</Button>
                            <Button variant="danger">Delete</Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default AdminOrganizationModeration;
