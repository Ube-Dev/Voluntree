import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { Doughnut, Bar, Line, Pie, PolarArea } from 'react-chartjs-2';
// import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { Organization } from '../../api/organization/OrganizationCollection';
import OrganizationOverview from '../components/OrganizationOverview';

const Dashboard = () => {
  const { ready, organization } = useTracker(() => {
    const currentUser = Meteor.userId(); // Retrieve the current user
    const subscription = Organization.subscribeOrganization(); // Subscribe to organization publication for the current user
    const profile = Organization.findOne({ leaderID: currentUser.id }); // Query user profile for the current user
    console.log('profile:', profile);
    return {
      ready: subscription ? subscription.ready() : false,
      organization: profile,
    };
  });

  // console.log('leader ID:', organization.leader);

  return (
    ready ? (
      <Container fluid id={PAGE_IDS.DASHBOARD} className="py-3 color2 justify-content-center">
        <Container>
          <Row className="align-content-center">
            <Col xs={12}>
              <h1 className="text-center">Dashboard</h1>
              <OrganizationOverview organization={organization} />
            </Col>
          </Row>
        </Container>
      </Container>
    ) : (
      <Container className="p-2">
        <LoadingSpinner /> {/* Show loading spinner while data is loading */}
      </Container>
    )
  );
};

export default Dashboard;
