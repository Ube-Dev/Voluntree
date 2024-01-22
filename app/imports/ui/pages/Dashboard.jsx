import React from 'react';
import { Col, Container, Image, Row, Card, Nav, Navbar, NavItem } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { PAGE_IDS } from '../utilities/PageIDs';

Chart.register(ArcElement);

/* A simple static component to render some text for the landing page. */
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow',
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
    ],
    hoverOffset: 4,
  }],
};
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
        <Row>
          <Card xs={12} md="auto">
            <Card.Header>Mission Statement</Card.Header>
            <Card.Body> <Doughnut data={data} /></Card.Body>
          </Card>

        </Row>

      </Col>
    </Row>
  </Container>
);

export default Dashboard;
