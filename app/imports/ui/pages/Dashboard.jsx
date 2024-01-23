import React from 'react';
import { Col, Container, Image, Row, Card, Nav, Navbar, NavItem } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart, ArcElement,CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { PAGE_IDS } from '../utilities/PageIDs';

Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

/* A simple static component to render some text for the landing page. */
const color1 = 'rgb(2, 81, 89)';
const color2 = 'rgb(3, 166, 150)';
const color3 = 'rgb(4, 191, 157)';
const color4 = 'rgb(110, 191, 52)';
const color5 = 'rgb(242, 242, 242)';
const doughnutData = {
  labels: [
    'Red',
    'Blue',
    'Yellow',
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      color1,
      color2,
      color3,
    ],
    hoverOffset: 4,
  }],
};
const barData = {

    labels: ["January", "February", "March", "April", "May"],
    datasets: [{
      data: [55, 49, 44, 24, 15],
      backgroundColor: [
        color1,
        color2,
        color3,
        color4,
        color5,
          ],

    }]
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
        <Row className="justify-content-center">
          <Image className="circle" src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0022/1594/brand.gif?itok=z5CHdxN7" alt="habitat for humanity" />
          <h2>Habitat for humanity</h2>
          <h3> Company Summary:</h3>
          <p>

          </p>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <Card >
              <Card.Body>
                <Doughnut data={doughnutData}/>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card >
              <Card.Body>
                <Doughnut data={doughnutData}/>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card >
              <Card.Body>
                <Doughnut data={doughnutData}/>
              </Card.Body>
            </Card>
          </Col>

        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Card >
              <Card.Body>
                <Bar data={barData}/>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card >
              <Card.Body>
                <Bar data={barData}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Col>
    </Row>
  </Container>
);

export default Dashboard;
