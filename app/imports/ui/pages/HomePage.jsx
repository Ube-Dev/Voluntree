import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import SearchBar from '../components/SearchBar';
import UserDashboard from '../components/UserDashboard';

const HomePage = () => (
  <Container id={PAGE_IDS.HOME_PAGE} className="py-3">
    <Row className="justify-content-center">
      <Col xs={12} md={8} className="d-flex flex-column align-items-center justify-content-center">
        <div className="my-3 text-center">
          <Card style={{ width: '60rem' }}>
            <Card.Body>
              <h2>Event Search</h2>
              <SearchBar id={COMPONENT_IDS.SEARCHBAR} />
            </Card.Body>
          </Card>
        </div>
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
              <Card style={{ width: '25rem', height: '20rem' }} className="mr-3">
                <Card.Body className="d-flex flex-column align-items-center">
                  <h3 className="mb-3">Create An Opportunity</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '25rem', height: '20rem' }}>
                <Card.Body className="d-flex flex-column align-items-center">
                  <h3 className="mb-3">Volunteer Calendar</h3>
                  <Card.Title>Google Calendar</Card.Title>
                  <Card.Img variant="top" style={{ width: '100%', height: '100%' }} src="https://media.gcflearnfree.org/content/560be4f6557fa909dc9cf5a1_09_30_2015/googletips_calendar2.jpg" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </Container>
);

export default HomePage;
