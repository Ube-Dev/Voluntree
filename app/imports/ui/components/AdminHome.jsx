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
          <Card.Header><h3 className="text-center">Site Management</h3></Card.Header>
          <Card.Body>
            <Row className="text-center">
              <Col className="col-6">
                <Button variant="outline-dark" size="lg" className="rounded-0">
                  Events
                </Button>
              </Col>
              <Col className="col-6">
                <Button variant="outline-dark" size="lg" className="rounded-0">
                  Organizations
                </Button>
              </Col>
              <Col className="col-6">
                <Button variant="outline-dark" size="lg" className="rounded-0">
                  Users
                </Button>
              </Col>
              <Col className="col-6">
                <Button variant="outline-dark" size="lg" className="rounded-0">
                  Reviews
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <AdminStats />
      </Col>
    </Row>
  </Container>
);

export default AdminHome;
