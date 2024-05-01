import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Star } from 'react-bootstrap-icons';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from './LoadingSpinner';

const OrgReview = ({ review }) => {
  const { ready, profile } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const profileSubscription = UserProfiles.subscribeUser();
    // Determine if the subscription is ready
    const rdy = profileSubscription.ready();
    // Get the profile whose email matches the reviewer's
    const reviewerProfile = UserProfiles.findOne({ _id: { $eq: review.reviewerID } });
    return {
      profile: reviewerProfile,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      <Container className="d-inline-block">
        <h6>{profile.firstName} {profile.lastName}</h6>
        {review.rating === null ? (
          <h6>Rating: <Star className="pb-1" /> 0</h6>
        ) : (
          <h6>Rating: <Star className="pb-1" /> {review.rating}</h6>
        )}
        {review.content}
        <hr />
      </Container>
    </Container>
  ) : (<LoadingSpinner />));
};

// Require a document to be passed to this component.
OrgReview.propTypes = {
  review: PropTypes.shape({
    rating: { type: Number, min: 1, max: 5 },
    reviewerID: { type: String }, // userID
    reviewFor: { type: Object },
    'reviewFor.type': { type: String, allowedValues: ['event', 'organization'] }, // ["event", "organization"]
    'reviewFor.ID': { type: String }, // eventID/organizationID
    content: { type: String },
  }).isRequired,
};

export default OrgReview;
