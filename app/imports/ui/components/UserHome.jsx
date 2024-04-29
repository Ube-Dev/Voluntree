import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import '../css/UserHome.css';
import UserDashboard from './UserDashboard';
import UpcomingEventCard from './UpcomingEventCard';
import UserCalendar from './UserCalendar';

const UserHome = () => (
  <Container id={PAGE_IDS.HOME_PAGE} className="py-5">
    <Card className="user-card-background p-3 rounded-4">
      <Row className="align-content-center">
        <Col xs={12} md={5}>
          <UserDashboard />
          <UpcomingEventCard />
        </Col>
        <Col xs={12} md={7}>
          <UserCalendar />
        </Col>
      </Row>
    </Card>
  </Container>
);

export default UserHome;
