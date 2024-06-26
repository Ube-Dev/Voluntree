import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ButtonGroup, Modal, Image } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import Fuse from 'fuse.js';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { removeOrganization } from '../../startup/both/Methods';
import { Organization } from '../../api/organization/OrganizationCollection';
import '../css/AdminModeration.css';

/** This admin-only page moderates organizations. Able to view, edit, and delete organizations. */
const AdminOrganizationModeration = () => {
  const { ready, organization } = useTracker(() => {
    const subscription = Organization.subscribeOrganization(); // Subscribe to organization publication for the current user
    const profile = Organization.find().fetch(); // Find the organization for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      organization: profile,
    };
  });

  // Delete function variable definitions
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [orgIdToDelete, setOrgIdToDelete] = useState(null);
  const toggleDeleteConfirmation = (orgId) => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
    setOrgIdToDelete(orgId);
  };

  // Search variable definitions
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
      keys: ['name', 'type', 'email', 'phone'],
    };

    const fuse = new Fuse(organization, fuseOptions);
    const result = fuse.search(searchQuery);
    displayedOrganizations = result.map((item) => item.item);
  }

  const confirmDelete = () => {
    Meteor.call(removeOrganization, orgIdToDelete, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Organization deleted successfully', 'success');
        setShowDeleteConfirmation(false);
      }
    });
  };

  return ready ? (
    <Container fluid className="color1 py-5" id={PAGE_IDS.ADMIN_ORGANIZATION_MODERATION}>
      <Container className="">
        <Row className="text-center pb-3">
          <h1>Organization Moderation</h1>
        </Row>
        <Card className="rounded-4 p-3 org-moderation-background">
          <Row className="justify-content-center">
            <Col className="col-7">
              <Form.Group className="search-bar">
                <Form.Control
                  id={COMPONENT_IDS.ADMIN_ORGANIZATION_MODERATION_SEARCH_BAR}
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
                      <th>PFP</th>
                      <th>Organization</th>
                      <th>Category</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedOrganizations.map((org) => (
                      <tr key={org._id}>
                        <td><Image src={org.image} className="org-mod-image" alt="Organization-submitted image" /></td>
                        <td>{org.name}</td>
                        <td>{org.type}</td>
                        <td>{org.contactEmail}</td>
                        <td>{org.phone}</td>
                        <td>{org.averageRating}</td>
                        <td className="text-center">
                          <ButtonGroup>
                            <Button variant="success" href={`/org-profile/${org._id}`}>View</Button>
                            <Button variant="warning" href={`/admin-edit-organization/${org._id}`}>Edit</Button>
                            <Button variant="danger" onClick={() => toggleDeleteConfirmation(org._id)}>Delete</Button>
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
        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this Organization?</p>
            <p>The user will be notified of this deletion.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Confirm Delete</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default AdminOrganizationModeration;
