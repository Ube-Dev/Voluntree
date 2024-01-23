import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const About = () => (
  <>
    <Container fluid className="about-background p-0">
      <h1>Who We Are</h1>
    </Container>
    <Container className="p-3">
      <Row>
        <Col className="text-center">
          <h2>Transforming Volunteer Engagement</h2>
        </Col>
        <Col>
          <p>
            Our mission is to empower individuals to impact their communities by enhancing the volunteer experience. We aim to remove barriers for volunteers and philanthropists,
            providing an accessible platform that connects community needs with those eager to help. Recognizing the inherent desire to contribute, our platform
            is designed to facilitate and streamline the process of finding and engaging in volunteer opportunities. We are dedicated to making it easier for those
            ready to serve to connect with the avenues where they can make the most impact.
          </p>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <h2>The Voluntree:</h2>
        <Col>
          <h3>Makes Working Together Simple</h3>
        </Col>
        <Col>
          <h3>Benifits Your Community</h3>
        </Col>
        <Col>
          <h3>Unlocks Your Potential</h3>
        </Col>
      </Row>
    </Container>
    <Container>
      <h1>Our Team</h1>

    </Container>
    <h2> asdf</h2>
  </>
);

export default About;
