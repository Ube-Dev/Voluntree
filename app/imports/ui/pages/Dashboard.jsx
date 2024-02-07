import React from 'react';
import { Col, Container, Image, Row, Card, Nav, Navbar } from 'react-bootstrap';
import { Doughnut, Bar, Line, Pie, PolarArea } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Organization } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';

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
const options =
    {
      scales:
          {
            x:
                {
                  title:
                      {
                        display: true,
                        text: 'Month',
                      },
                },
            y:
                {
                  title:
                      {
                        display: true,
                        text: 'Month',
                      },
                },

          },
    };
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

const Dashboard = () => {
  const { ready, organizations } = useTracker(() => {
    // Get access to events
    const subscription = Organization.subscribeOrganization();
    // Make sure its ready
    const rdy = subscription.ready();
    // fetch the Organization
    return {
      organizations: subscription,
      ready: rdy,
    };
  }, []);

  if (ready) {
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
                  <h2>{ organizations.name }</h2>
                  <h3> Company Summary:</h3>
                  <p>Habitat for Humanity partners with people in your community, and all over the world, to help them
                    build or improve a place they can call home.
                    Habitat homeowners help build their own homes alongside volunteers and pay an affordable mortgage.
                    With your support, Habitat homeowners achieve the strength, stability and independence they need
                    to
                    build a better life for themselves and for their families.
                    Through our 2020 Strategic Plan, Habitat for Humanity will serve more people than ever before
                    through decent and affordable housing.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <Card>
                    <Card.Body>
                      <Doughnut data={doughnutData} options={options} />
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
  return <LoadingSpinner />;
};
export default Dashboard;
