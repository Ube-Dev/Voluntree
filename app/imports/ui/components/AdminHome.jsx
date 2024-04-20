import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AdminHoursStats from './AdminHoursStats';
import '../css/AdminHome.css';

const AdminHome = () => (
  <Container className="py-3">
    <Row className="text-center py-3">
      <h1>Admin View</h1>
    </Row>
    <Row>
      <Col className="col-5">
        <Card className="rounded-4">
          <Card.Header><h3 className="text-center">Site Management</h3></Card.Header>
          <Card.Body>
            <Row className="text-center">
              <Button variant="outline-dark" size="lg" className="rounded-0 management-btn">
                Events
              </Button>
              <Button variant="outline-dark" size="lg" className="rounded-0 management-btn">
                Organizations
              </Button>
              <Button variant="outline-dark" size="lg" className="rounded-0 management-btn">
                Users
              </Button>
              <Button variant="outline-dark" size="lg" className="rounded-0 management-btn">
                Reviews
              </Button>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-7">
        <AdminHoursStats />
      </Col>
    </Row>
  </Container>
);

export default AdminHome;
