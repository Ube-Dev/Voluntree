import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Organization } from '../../api/organization/OrganizationCollection';
import ConnectButton from '../components/ConnectButton';
import UserViewOrgEvents from '../components/UserViewOrgEvents';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import '../css/OrganizationProfile.css';
import GoBackButton from '../components/GoBackButton';
import OrgReview from '../components/OrgReview';
import { Review } from '../../api/review/ReviewCollection';

/** Organization profile page which can be viewed by everyone. */
const UserViewOrgProfile = () => {
  const { _id } = useParams();
  const theUser = Meteor.user();
  console.log(theUser);
  const { ready, orgProfile, theReviews } = useTracker(() => {
    const subscription = Organization.subscribeOrganization(); // Subscribe to organization publication
    const sub2 = Review.subscribeReviewOrganization(_id); // Subscribe to review publication
    const profile = Organization.findOne({ _id: _id }); // Query organization
    const review = Review.find({ 'reviewFor.ID': _id }).fetch(); // Query reviews
    console.log(review);
    return {
      ready: subscription ? subscription.ready() && sub2.ready() : false,
      orgProfile: profile,
      theReviews: review,
    };
  });

  // Once data is ready, render the organization profile
  return ready ? (
    <Container fluid id={PAGE_IDS.USER_VIEW_ORG_PROFILE} className="px-2 py-5 color1">
      <Container>
        <Row className="px-3">
          <Col sm={12} md={1}>
            <GoBackButton />
          </Col>
          <Col sm={12} md={11}>
            <h1 className="text-center pb-2">{orgProfile.name}&apos; Profile</h1>
          </Col>
        </Row>
        <Container className="my-3 rounded-4 color2">
          <Row>
            <Col sm={12} md={12} className="p-4">
              <Card className="rounded-4">
                <Card.Header>
                  <h2>Organization Details</h2>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col sm={12} md={3} className="justify-content-center">
                      <Image src={orgProfile.image} className="org-profile-img rounded mb-4" />
                    </Col>
                    <Col sm={12} md={9}>
                      <h2>{orgProfile.name}</h2>
                      <hr />
                      <h5>Mission:</h5>
                      {orgProfile.mission ? (
                        <p>{orgProfile.mission}</p>
                      ) : (<p>N/A</p>)}
                      <h5>Location:</h5>
                      {orgProfile.hasPhysicalAddress ? (
                        <p>{orgProfile.address}, {orgProfile.city}, {orgProfile.state}, {orgProfile.country} {orgProfile.zipCode}</p>
                      ) : (<p>N/A</p>)}
                      <Row>
                        <Col>
                          <h5>Contact Email:</h5>
                          {orgProfile.contactEmail ? (
                            <p>{orgProfile.contactEmail}</p>
                          ) : (<p>N/A</p>)}
                        </Col>
                        <Col>
                          <h5>Phone:</h5>
                          {orgProfile.phone ? (
                            <p>{orgProfile.phone}</p>
                          ) : (<p>N/A</p>)}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col className="text-end">
                      {orgProfile.contactEmail ? (<ConnectButton org={orgProfile} />) : ''}
                    </Col>
                    <Col className="text-end">
                      {theUser._id !== orgProfile.leader ? (<Button variant="primary" href={`/review-organization/${_id}`}>Leave a review</Button>) : ''}
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
            <Col sm={12} md={1} />
          </Row>
        </Container>
        <Container className="my-3 rounded-4 color2">
          <Row className="py-3">
            <Col md={12}>
              <h1 className="text-center">Events by {orgProfile.name}</h1>
              <UserViewOrgEvents org={orgProfile} />
            </Col>
          </Row>
        </Container>
        <Container className="my-3 rounded-4 color2">
          <Row className="py-3">
            <h1 className="text-center">Reviews</h1>
            <Col>
              {theReviews.map((review, index) => <Row key={index}><OrgReview review={review} /></Row>)}
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default UserViewOrgProfile;
