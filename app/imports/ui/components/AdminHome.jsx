import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AdminStats from './AdminStats';

const AdminHome = () => (
  <Container className="py-3">
    <Row className="text-center py-3">
      <h1>Admin View</h1>
    </Row>
    <Row>
      <Col>
        <Card className="rounded-4">
          <Card.Header><h3>Site Management</h3></Card.Header>
          <Col>
            <Button>Events</Button>
            <Button>Organization</Button>
            <Button>Users</Button>
            <Button>Reviews</Button>
          </Col>
        </Card>
      </Col>
      <Col>
        <AdminStats />
      </Col>
    </Row>
  </Container>
);

export default AdminHome;
