import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../css/AdminHome.css';
import AdminHoursStats from './AdminHoursStats';
import AdminSiteStats from './AdminSiteStats';
import AdminRecentEvents from './AdminRecentEvents';

const AdminHome = () => (
  <Container className="py-3">
    <Row className="text-center py-3">
      <h1>Admin View</h1>
    </Row>
    <Card className="admin-card-background rounded-4">
      <Row className="p-3">
        <Col className="col-4">
          <AdminSiteStats />
          <Card className="rounded-4">
            <Card.Header><h3 className="text-center">Site Management</h3></Card.Header>
            <Card.Body className="mx-3">
              <Row className="text-center">
                <Button variant="outline-dark" href="/event-moderation" className="rounded-0 management-btn">
                  Events
                </Button>
                <Button variant="outline-dark" className="rounded-0 management-btn">
                  Organizations
                </Button>
                <Button variant="outline-dark" className="rounded-0 management-btn">
                  Users
                </Button>
                <Button variant="outline-dark" className="rounded-0 management-btn">
                  Reviews
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-8 align-content-center">
          <AdminHoursStats />
        </Col>
      </Row>
      <Row>
        <AdminRecentEvents />
      </Row>
    </Card>
  </Container>
);

export default AdminHome;
