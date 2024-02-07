import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import UserDashboard from '../components/UserDashboard';
import UserCalendar from '../components/UserCalendar';

const HomePage = () => (
  <Container id={PAGE_IDS.HOME_PAGE} className="py-3">
    <Row>
      <Col className="d-flex flex-column">
        <UserDashboard />
      </Col>
      <Col className="d-flex flex-column">
        <UserCalendar />
      </Col>
    </Row>
  </Container>
);

export default HomePage;
