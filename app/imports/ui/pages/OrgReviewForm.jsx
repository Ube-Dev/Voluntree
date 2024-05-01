import React, { useState } from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, LongTextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { StarFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from './NotFound';
import { Review } from '../../api/review/ReviewCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Organization } from '../../api/organization/OrganizationCollection';
import { createReview } from '../../startup/both/Methods';

const reviewSchema = new SimpleSchema({
  content: { type: String },
});
const bridge = new SimpleSchema2Bridge(reviewSchema);

/* Renders the EditItem page for editing a single document. */
const OrgReviewForm = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { organization, profile, ready } = useTracker(() => {
    // Get access to Item documents.
    const currentUser = Meteor.users.findOne({ _id: Meteor.userId() });
    const subscription = Organization.subscribeOrganization(_id); // subscribe to organizations
    const sub2 = Review.subscribeReviewOrganization(_id); // subscribe to reviews for organizations
    const sub3 = currentUser ? UserProfiles.subscribeSingleUser(currentUser._id) : null; // Subscribe to userProfile publication for the current user
    // Get the document
    const foundUser = currentUser ? UserProfiles.findOne({ userID: currentUser._id }) : null; // Query user profile for the current user
    const foundOrg = Organization.findOne(_id); // Query organization
    return {
      organization: foundOrg,
      profile: foundUser,
      ready: subscription ? subscription.ready() && sub2.ready() && sub3.ready() : false,
    };
  }, [_id]);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { content } = data;
    const reviewee = Organization.findOne(_id);
    const reviewer = Meteor.user();
    const reviewData = {
      rating: rating,
      reviewerID: reviewer._id,
      reviewFor: {
        type: 'organization',
        ID: reviewee._id,
      },
      content: content,
    };
    console.log(reviewData);
    Meteor.call(createReview, reviewData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Review submitted successfully', 'success');
      }
    });
  };

  if (ready) {
    if (!profile) {
      return <NotFound />;
    }
    return (
      <Container id="review-form-page" className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Rate {organization.name}</h2></Col>
            <AutoForm schema={bridge} onSubmit={data => submit(data)}>
              <Card>
                <Card.Body>
                  Rate this organization: <br /> {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      // eslint-disable-next-line jsx-a11y/label-has-associated-control
                      <label key={currentRating}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                        />
                        <StarFill
                          className="star"
                          color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                  <LongTextField id="review-org-content" name="content" />
                  <SubmitField id="review-org-submit" value="Submit" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    );
  }
  return <LoadingSpinner />;
};

export default OrgReviewForm;
