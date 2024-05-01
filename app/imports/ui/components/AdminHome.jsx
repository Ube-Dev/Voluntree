import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../css/AdminHome.css';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import AdminHoursStats from './AdminHoursStats';
import AdminSiteStats from './AdminSiteStats';
import AdminRecentEvents from './AdminRecentEvents';

/** Main component in home page upon logging in as admin. */
const AdminHome = () => (
  <Container className="py-5" id={COMPONENT_IDS.ADMIN_HOME_PAGE}>
    <Card className="admin-card-background rounded-4">
      <Row className="p-3">
        <Col className="col-4">
          <AdminSiteStats />
          <Card className="rounded-4">
            <Card.Header><h3 className="text-center">Site Management</h3></Card.Header>
            <Card.Body className="mx-3">
              <Row className="text-center">
                <Button variant="outline-dark" href="/event-moderation" className="rounded-0 management-btn" id={COMPONENT_IDS.ADMIN_HOME_EVENT_MODERATION}>
                  Events
                </Button>
                <Button variant="outline-dark" href="/organization-moderation" className="rounded-0 management-btn" id={COMPONENT_IDS.ADMIN_HOME_ORGANIZATION_MODERATION}>
                  Organizations
                </Button>
                <Button variant="outline-dark" href="/user-moderation" className="rounded-0 management-btn" id={COMPONENT_IDS.ADMIN_HOME_USER_MODERATION}>
                  Users
                </Button>
                <Button variant="outline-dark" href="/review-moderation" className="rounded-0 management-btn" id={COMPONENT_IDS.ADMIN_HOME_REVIEW_MODERATION}>
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
