import React from 'react';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import UserDashboard from '../components/UserDashboard';
import UserCalendar from '../components/UserCalendar';

const HomePage = () => (
  <Container fluid className="color4">
    <Container id={PAGE_IDS.HOME_PAGE} className="py-3">
      <Row>
        <Col className="d-flex flex-column col-md-5 col-12">
          <UserDashboard />
          <Container className="d-flex flex-column h-100">
            <Row className="flex-grow-1">
              <Col className="d-flex flex-column">
                <Card className="w-100 h-100 my-1">
                  <Card.Header>
                    <h2>Upcoming Events</h2>
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center align-items-center p-2">
                    <p className="m-0">Hmmm... No Events...</p>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-center p-2">
                    <Button className="justify-content-center m-auto" style={{ backgroundColor: 'gold', color: 'black', border: 'none' }}>
                      <a href="/Events" style={{ textDecoration: 'none', color: 'inherit', padding: '10px' }}>Find Events</a>
                    </Button>
                  </Card.Footer>
                </Card>
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
