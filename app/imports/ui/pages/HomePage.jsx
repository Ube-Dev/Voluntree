import React from 'react';
import { Col, Container, Row, Card, Tab, ProgressBar, Table, Tabs } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import SearchBar from '../components/SearchBar';

const HomePage = () => (
  <Container id={PAGE_IDS.HOME_PAGE} className="py-3">
    <Row className="justify-content-center">
      <Col xs={12} md={8} className="d-flex flex-column align-items-center justify-content-center">
        <div className="my-3 text-center">
          <Card style={{ width: '60rem' }}>
            <Card.Body>
              <h2>Event Search</h2>
              <SearchBar />
            </Card.Body>
          </Card>
        </div>

        {/* User Overview */}
        <div className="my-3 d-flex justify-content-center">
          <Row>
            <Col>
              {/* Display user information */}
              <Card style={{ width: '50rem', height: '30rem' }}>
                <Card.Body className="d-flex flex-column align-items-center">
                  <h2 className="mb-3">User Overview</h2>
                  <Tabs defaultActiveKey="served" id="fill-tab-example" className="mb-3" fill>
                    <Tab eventKey="profile" title="Profile">
                      <Card style={{ width: '30rem', height: '20rem' }}>
                        <Card.Img variant="top" style={{ width: '100%', height: '100%' }} src="https://help.learn.taleo.net/Content/Resources/Images/User%20Account%20Graphics/UserProperties_Details.png" />
                      </Card>
                    </Tab>
                    <Tab eventKey="served" title="Served">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Served</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>a</td>
                            <td>1 hour</td>
                            <td>2 hours</td>
                            <td>3 houes</td>
                          </tr>
                          <tr>
                            <td>b</td>
                            <td>1 hour</td>
                            <td>2 hours</td>
                            <td>3 houes</td>
                          </tr>
                        </tbody>
                      </Table>
                      <ProgressBar variant="success" now={40} />
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="my-3 d-flex justify-content-center">
          <Row>
            <Col>
              <Card style={{ width: '25rem', height: '20rem' }} className="mr-3">
                <Card.Body className="d-flex flex-column align-items-center">
                  <h3 className="mb-3">Create An Opportunity</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '25rem', height: '20rem' }}>
                <Card.Body className="d-flex flex-column align-items-center">
                  <h3 className="mb-3">Volunteer Calendar</h3>
                  <Card.Title>Google Calendar</Card.Title>
                  <Card.Img variant="top" style={{ width: '100%', height: '100%' }} src="https://media.gcflearnfree.org/content/560be4f6557fa909dc9cf5a1_09_30_2015/googletips_calendar2.jpg" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

      </Col>
    </Row>
  </Container>
);

export default HomePage;
