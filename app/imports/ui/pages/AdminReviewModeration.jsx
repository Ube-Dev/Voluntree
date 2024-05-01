import React, { useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button, Modal, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Fuse from 'fuse.js';
import '../css/AdminModeration.css';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Review } from '../../api/review/ReviewCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { removeReview } from '../../startup/both/Methods';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const AdminReviewModeration = () => {
  // Delete function variable definitions
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [reviewToRemove, setReviewToRemove] = useState(null);
  const toggleDeleteConfirmation = (reviewId) => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
    setReviewToRemove(reviewId);
  };

  // Get the reviews from the database
  const { ready, reviews } = useTracker(() => {
    const subscription = Review.subscribeReviewModeration();
    const allReviews = Review.find({}).fetch();
    return {
      ready: subscription.ready(),
      reviews: allReviews,
    };
  });

  const confirmDelete = () => {
    Meteor.call(removeReview, reviewToRemove, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Review deleted successfully', 'success');
        setShowDeleteConfirmation(false);
      }
    });
  };

  // Search variable definitions
  let displayedReviews = reviews;
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
      keys: ['rating', 'content'],
    };

    const fuse = new Fuse(reviews, fuseOptions);
    const result = fuse.search(searchQuery);
    displayedReviews = result.map((item) => item.item);
  }

  // Function to fetch user's name by ID
  const getUserById = (userId) => {
    const user = UserProfiles.findOne({ _id: userId });
    return user ? `${user.firstName} ${user.lastName}` : <LoadingSpinner />;
  };

  return ready ? (
    <Container fluid className="color1 pb-5">
      <Container>
        <Row className="text-center py-4">
          <h1>Review Moderation</h1>
        </Row>
        <Row>
          <Col>
            <Card className="p-3 rounded-4 org-moderation-background">
              <Row className="justify-content-center">
                <Col className="col-7">
                  <Form.Group className="search-bar">
                    <Form.Control
                      id={COMPONENT_IDS.ADMIN_ORGANIZATION_MODERATION_SEARCH_BAR}
                      type="text"
                      placeholder="Search for reviews..."
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
                          <th>Reviewer</th>
                          <th>Type</th>
                          <th>Rating</th>
                          <th>Review</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedReviews.map((review) => (
                          <tr key={review._id}>
                            <td>{getUserById(review.reviewerID)}</td>
                            <td>{review.reviewFor.type}</td>
                            <td>{review.rating}</td>
                            <td>{review.content}</td>
                            <td className="text-center">
                              <ButtonGroup>
                                <Button variant="danger" onClick={() => toggleDeleteConfirmation(review._id)}>Delete</Button>
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
          </Col>
        </Row>
        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this Review?</p>
            <p>The user will be notified of this deletion.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Confirm Delete</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  ) : (<LoadingSpinner />);
};

export default AdminReviewModeration;
