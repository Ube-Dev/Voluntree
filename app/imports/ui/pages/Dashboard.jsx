import React from 'react';
import { Col, Container, Row, Dropdown } from 'react-bootstrap';
// import { Doughnut, Bar, Line, Pie, PolarArea } from 'react-chartjs-2';
// import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { Organization } from '../../api/organization/OrganizationCollection';
import OrganizationOverview from '../components/OrganizationOverview';
import UserCalendar from '../components/UserCalendar';

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

  return (
    ready ? (
      <Container fluid id={PAGE_IDS.DASHBOARD} className="py-3 color2 justify-content-center">
        <Container>
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <h3>Organization Dashboard</h3>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/edit-organization-profile">Edit Profile</Dropdown.Item>
                  <Dropdown.Item href="/add-event">Add Event</Dropdown.Item>
                  <Dropdown.Item href="/edit-event">Edit Event</Dropdown.Item>
                  <Dropdown.Item href="/add-opportunity">Add Opportunity</Dropdown.Item>
                  <Dropdown.Item href="/edit-opportunity">Edit Opportunity</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <h1 className="text-center">Organization Dashboard</h1>
            </Col>
          </Row>
          <Row className="align-content-center">
            <Col>
              <OrganizationOverview organization={organization} />
            </Col>
            <Col>
              <UserCalendar />
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
