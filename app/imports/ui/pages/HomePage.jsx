import React from 'react';
import { Col, Container, Row, Form, Button, Card, Tab, Dropdown, ProgressBar, Table, Tabs } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import SearchBar from '../components/SearchBar';

const HomePage = () => (
  <Container id={PAGE_IDS.HOME_PAGE} className="py-3">
    <Row className="justify-content-center">
      <Col xs={12} md={8} className="d-flex flex-column align-items-center justify-content-center">
        <div className="my-3 text-center">
          <Card style={{ width: '60rem', height: '10rem' }}>
            <Card.Body>
              <h2>Event Search</h2>
              <SearchBar />
              {/* <Form className="mb-3"> */}
              {/*  <Form.Group controlId="formEventSearch" className="d-flex align-items-center"> */}
              {/*    <Form.Control type="text" placeholder="Search for events..." style={{ width: '500px' }} className="mr-2" /> */}
              {/*    /!* Filter Dropdowns *!/ */}
              {/*    <Dropdown> */}
              {/*      <Dropdown.Toggle variant="secondary" id="dropdown-basic"> */}
              {/*        Select Distance */}
              {/*      </Dropdown.Toggle> */}
              {/*      <Dropdown.Menu> */}
              {/*        <Dropdown.Item href="#/action-1">5 miles</Dropdown.Item> */}
              {/*        <Dropdown.Item href="#/action-2">10 miles</Dropdown.Item> */}
              {/*        <Dropdown.Item href="#/action-3">20 miles</Dropdown.Item> */}
              {/*      </Dropdown.Menu> */}
              {/*    </Dropdown> */}
              {/*    <Dropdown> */}
              {/*      <Dropdown.Toggle variant="secondary" id="dropdown-basic"> */}
              {/*        Select Organization */}
              {/*      </Dropdown.Toggle> */}
              {/*      <Dropdown.Menu> */}
              {/*        <Dropdown.Item href="#/action-1">Organization 1</Dropdown.Item> */}
              {/*        <Dropdown.Item href="#/action-2">Organization 2</Dropdown.Item> */}
              {/*        <Dropdown.Item href="#/action-3">Organization 3</Dropdown.Item> */}
              {/*      </Dropdown.Menu> */}
              {/*    </Dropdown> */}
              {/*    <Button variant="secondary" type="submit" className="ml-2"> */}
              {/*      Search */}
              {/*    </Button> */}
              {/*  </Form.Group> */}
              {/* </Form> */}
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
                      <Card style={{ width: '10rem', height: '15rem' }}>
                        <Card.Img variant="top" style={{ width: '100%', height: '100%' }} src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" />
                        <Card.Body>
                          <Card.Title>Profile</Card.Title>
                          <Card.Text>
                            <p> First Name </p>
                            <p> Last Name </p>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Tab>
                    <Tab eventKey="served" title="Served">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#########</th>
                            <th>xxxxxxxxx</th>
                            <th>xxxxxxxxx</th>
                            <th>xxxxxxxxx</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>xxxxxxxxx</td>
                            <td>xxxxxxxxx</td>
                            <td>xxxxxxxxx</td>
                            <td>xxxxxxxxx</td>
                          </tr>
                          <tr>
                            <td>xxxxxxxxx</td>
                            <td>xxxxxxxxx</td>
                            <td>xxxxxxxxx</td>
                            <td>xxxxxxxxx</td>
                          </tr>
                        </tbody>
                      </Table>
                      <div>
                        <ProgressBar variant="success" now={40} />
                        <ProgressBar variant="info" now={20} />
                        <ProgressBar variant="warning" now={60} />
                        <ProgressBar variant="danger" now={80} />
                      </div>
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
