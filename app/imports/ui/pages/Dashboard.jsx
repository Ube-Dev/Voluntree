import React from 'react';
import { Col, Container, Image, Row, Card, Nav, Navbar } from 'react-bootstrap';
import { Doughnut, Bar, Line, Pie, PolarArea } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { MATPCollections } from '../../api/matp/MATPCollections';

const Dashboard = () => {
  const { ready, organization } = useTracker(() => {
    const currentUser = Meteor.user(); // Retrieve the current user
    const subscription = currentUser ? UserProfiles.subscribeUser() : null; // Subscribe to userProfile publication for the current user
    const org = MATPCollections.getCollection('OrganizationCollection');

    return {
      ready: subscription ? subscription.ready() : false,
      organization: org,
    };
  });
  if (ready) {

    Chart.register(ArcElement);
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(BarElement);
    Chart.register(PointElement);
    Chart.register(LineElement);
    Chart.register(RadialLinearScale);

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
    const lineData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [{
        label: 'My First Dataset',
        data: [55, 49, 44, 24, 15],
        backgroundColor: [
          color1,
          color2,
          color3,
          color4,
          color5,
        ],
        hoverOffset: 4,
      }],
    };
    const barData = {

      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [{
        data: [55, 49, 44, 24, 15],
        backgroundColor: [
          color1,
          color2,
          color3,
          color4,
          color5,
        ],

      }],
    };
    return (
      <Container fluid id={PAGE_IDS.DASHBOARD} className="py-3 color2 justify-content-center">
        <Container>
          <Row className="pb-4 ">
            <Col xs={12}>
              <Navbar expand="md">
                <Nav className="me-auto">
                  <Nav.Link><a href="/">Campaigns</a></Nav.Link>
                  <Nav.Link><a href="/">Volunteer Opportunities</a></Nav.Link>
                  <Nav.Link><a href="/">Events</a></Nav.Link>
                </Nav>
              </Navbar>

            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Row className="justify-content-center">
                <Col md={4} className="">
                  <Image
                    src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0022/1594/brand.gif?itok=z5CHdxN7"
                    alt="habitat for humanity"
                    className="circle"
                  />
                </Col>
                <Col md={8}>
                  <h2>{organization.name}</h2>
                  <h3> Company Summary:</h3>
                  <p>{organization.description}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <Card>
                    <Card.Body>
                      <Doughnut data={doughnutData} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={4}>
                  <Card>
                    <Card.Body>
                      <PolarArea data={barData} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={4}>
                  <Card>
                    <Card.Body>
                      <Pie data={doughnutData} />
                    </Card.Body>
                  </Card>
                </Col>

              </Row>
              <Row className="pt-4">
                <Col xs={12} md={6}>
                  <Card>
                    <Card.Body>
                      <Bar data={barData} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card>
                    <Card.Body>
                      <Line data={lineData} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

  return (
    <Container className="p-2">
      <LoadingSpinner /> {/* Show loading spinner while data is loading */}
    </Container>
  );

};

export default Dashboard;
