import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { Organization } from '../../api/organization/OrganizationCollection';
import OrganizationDropdown from '../components/OrganizationDropdown';

const Dashboard = () => {
  const { ready, organization } = useTracker(() => {
    const currentUser = Meteor.userId(); // Retrieve the current user
    const subscription = Organization.subscribeOrganization(); // Subscribe to organization publication for the current user
    const profile = currentUser ? Organization.find({ leader: currentUser }).fetch() : null; // Query user profile for the current user
    console.log(currentUser);
    return {
      ready: subscription ? subscription.ready() : false,
      organization: profile,
    };
  });

  return (
    ready ? (
      <Container fluid id={PAGE_IDS.DASHBOARD} className="py-5 color1 justify-content-center">
        <Row className="pb-4 text-center">
          <h1>Dashboard</h1>
        </Row>
        <Row className="px-md-5">
          <OrganizationDropdown myOrganization={organization} />
        </Row>
      </Container>
    ) : (
      <Container className="p-2">
        <LoadingSpinner /> {/* Show loading spinner while data is loading */}
      </Container>
    )
  );
};

export default Dashboard;
