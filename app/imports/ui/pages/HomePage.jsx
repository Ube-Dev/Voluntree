import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import UserDashboard from '../components/UserDashboard';
import UserCalendar from '../components/UserCalendar';
import UpcomingEventCard from '../components/UpcomingEventCard';

const HomePage = () => (
  <Container fluid className="color3">
    <Container id={PAGE_IDS.HOME_PAGE} className="py-3">
      <Row>
        <Col className="d-flex flex-column col-md-5 col-12">
          <UserDashboard />
          <Container className="d-flex flex-column h-100">
            <Row className="flex-grow-1">
              <Col className="d-flex flex-column">
                <UpcomingEventCard />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="d-flex flex-column col-md-7 col-12 mt-3 mt-md-0">
          <UserCalendar />
        </Col>
      </Row>
    </Container>
  </Container>
);

export default HomePage;
