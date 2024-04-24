import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ButtonGroup, Modal, Image } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import Fuse from 'fuse.js';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { removeUserProfile } from '../../startup/both/Methods';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import '../css/AdminModeration.css';

const AdminUserModeration = () => {
  const { ready, userProfiles } = useTracker(() => {
    const subscription = UserProfiles.subscribeUser();
    const profile = UserProfiles.find().fetch();
    return {
      ready: subscription ? subscription.ready() : false,
      userProfiles: profile,
    };
  });

  // Delete function variable definitions
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const toggleDeleteConfirmation = (userId) => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
    setUserIdToDelete(userId);
  };

  // Search variable definitions
  let displayedUsers = userProfiles;
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
      keys: ['name', 'email', 'phone'],
    };

    const fuse = new Fuse(userProfiles, fuseOptions);
    const result = fuse.search(searchQuery);
    displayedUsers = result.map((item) => item.item);
  }

  const confirmDelete = () => {
    Meteor.call(removeUserProfile, userIdToDelete, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Organization deleted successfully', 'success');
        setShowDeleteConfirmation(false);
      }
    });
  };

  return ready ? (
    <Container fluid className="color1 py-5">
      <Container className="">
        <Row className="text-center pb-3">
          <h1>User Moderation</h1>
        </Row>
        <Card className="rounded-4 p-3 org-moderation-background">
          <Row className="justify-content-center">
            <Col className="col-7">
              <Form.Group className="search-bar">
                <Form.Control
                  id={COMPONENT_IDS.ORGANIZATION_SEARCHBAR}
                  type="text"
                  placeholder="Search for Users..."
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedUsers.map((user) => (
                      <tr key={user._id}>
                        {/* eslint-disable-next-line */}
                      <td><Image src={user.image} className="org-mod-image" /></td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td className="text-center">
                          <ButtonGroup>
                            {/* <Button variant="success" href={`/profile/${user._id}`}>View</Button> */}
                            <Button variant="warning" href={`/admin-edit-user/${user._id}`}>Edit</Button>
                            <Button variant="danger" onClick={() => toggleDeleteConfirmation(user._id)}>Delete</Button>
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

export default AdminUserModeration;
