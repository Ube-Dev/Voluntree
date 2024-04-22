import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Events } from '../../api/event/EventCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Organization } from '../../api/organization/OrganizationCollection';
// import { Review } from '../../api/review/ReviewCollection';

const AdminSiteStats = () => {

  const { ready, eventCount, userCount, organizationCount } = useTracker(() => {
    const subscription1 = Events.subscribeEvent();
    const subscription2 = UserProfiles.subscribeUser();
    const subscription3 = Organization.subscribeOrganization();
    // const subscription4 = Review.subscribeReviewUser();
    const event = Events.count();
    const user = UserProfiles.count();
    const organization = Organization.count();
    // const review = Review.count();
    return {
      ready: subscription1.ready() && subscription2.ready() && subscription3.ready(),
      eventCount: event,
      userCount: user,
      organizationCount: organization,
      // reviewCount: review,
    };
  });

  return ready ? (
    <Card className="rounded-4 mb-3 text-center">
      <Card.Header>
        <h3>Site Statistics</h3>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <Row className="text-center">
            <Col>
              <h4>Events:</h4>
              <h5>{eventCount}</h5>
            </Col>
            <Col>
              <h4>Users:</h4>
              <h5>{userCount}</h5>
            </Col>
            <Col>
              <h4>Organizations:</h4>
              <h5>{organizationCount}</h5>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <LoadingSpinner />
  );
};

export default AdminSiteStats;
