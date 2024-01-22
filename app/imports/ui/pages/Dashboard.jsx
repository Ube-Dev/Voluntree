import React from 'react';
import { Col, Container, Image, Row, Card, Nav, Navbar, NavItem } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Dashboard = () => (
  <Container id={PAGE_IDS.DASHBOARD} className="py-3">
    <Row>
      <Col xs={12} md={3}>
        <Navbar className>
          <Nav className="flex-column">
            <NavItem><a href="/">Campaigns</a></NavItem>
            <NavItem><a href="/">Volunteer Opportunities</a></NavItem>
            <NavItem><a href="/">Events</a></NavItem>

          </Nav>
        </Navbar>

      </Col>
      <Col xs={12} md={9}>
        <Row>
          <Image className="circle" src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0022/1594/brand.gif?itok=z5CHdxN7" width="100px" height="100px" alt="habitat for humanity" />
          <h2>Habitat for humanity</h2>
        </Row>

        <Card>
          <Card.Header>Mission Statement</Card.Header>
          <Card.Body> Lorem Ipsum</Card.Body>
        </Card>
        <Card>
          <Card.Header>Impact Index</Card.Header>
          <Card.Body> <strong>12</strong></Card.Body>
        </Card>
        <Card>
          <Card.Header>Upcoming Events</Card.Header>
          <Card.Body> <strong>12</strong></Card.Body>
        </Card>
        <Card>
          <Card.Header>Upcoming Events</Card.Header>
          <Card.Body> <strong>12</strong></Card.Body>
        </Card>

      </Col>
    </Row>
  </Container>
);

export default Dashboard;
