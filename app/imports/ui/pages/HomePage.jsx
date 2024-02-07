import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import UserDashboard from '../components/UserDashboard';
import UserCalendar from '../components/UserCalendar';

const HomePage = () => (
  <Container id={PAGE_IDS.HOME_PAGE} className="py-3 ">
    <Row className="justify-content-center">
      <Col xs={12} md={8} className="d-flex flex-column align-items-center justify-content-center">
        <div className="my-3 d-flex justify-content-center">
          <Row>
            <Col>
              <UserDashboard />
            </Col>
          </Row>
        </div>
        <div className="my-3 d-flex justify-content-center">
          <Row>
            <Col>
              <UserCalendar />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </Container>
);

export default HomePage;
