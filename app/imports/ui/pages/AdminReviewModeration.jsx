import React, { useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import '../css/AdminModeration.css';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Review } from '../../api/review/ReviewCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { removeReview } from '../../startup/both/Methods';

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

  // Function to fetch user's name by ID
  const getUserById = (userId) => {
    const user = UserProfiles.findOne({ _id: userId });
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  };

  console.log(reviews);

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

  return ready ? (
    <Container fluid className="color1">
      <Container>
        <Row className="text-center">
          <h1>Admin Review Moderation</h1>
        </Row>
        <Row>
          <Col>
            <Card className="p-3 rounded-4 org-moderation-background">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Reviewer</th>
                    <th>Rating</th>
                    <th>Type</th>
                    <th>Review</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
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
            </Card>
          </Col>
        </Row>
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
  ) : (<LoadingSpinner />);
};

export default AdminReviewModeration;
