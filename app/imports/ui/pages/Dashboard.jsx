import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import OrganizationOverview from '../components/OrganizationOverview';

const Dashboard = () => (
  <div id={PAGE_IDS.DASHBOARD}>
    <Container>
      <Row>
        <Col>
          <OrganizationOverview />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Dashboard;
