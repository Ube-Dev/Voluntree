import React from 'react';
import { Col, Container, Row, Card, Image } from 'react-bootstrap';

const About = () => (
  <>
    <Container fluid className="about-background p-0">
      <h1>Who We Are</h1>
    </Container>
    <Container className="p-3">
      <Row>
        <Col className="align-middle text-center">
          <h1>Rooted in the Mission to Spread Seeds of Giving Worldwide</h1>
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
    <Container fluid className="color2 p-3">
      <Row className="m-5">
        <h1>The Voluntree:</h1>
      </Row>
      <Row className="m-5 align-items-center align-content-center text-center">
        <Col className="col-4">
          <Card className="rounded-0 d-flex justify-content-center align-items-center text-center p-3" style={{ height: '325px' }}>
            <h3>Makes Working Together Simple</h3>
            <br />
            <Image src="./images/workTogetherAbout.png" alt="People working together" className="d-block" style={{ width: '32%' }} />
            <p>Removes barriers for volunteers to connect.</p>
          </Card>
        </Col>
        <Col className="col-4">
          <Card className="rounded-0 d-flex justify-content-center align-items-center text-center p-3" style={{ height: '325px' }}>
            <h3>Unlocks Your Potential</h3>
            <br />
            <Image src="./images/growthAbout.png" alt="People working together" className="d-block" style={{ width: '32%' }} />
            <p>Provides opportunities to grow and learn</p>
          </Card>
        </Col>
        <Col className="col-4">
          <Card className="rounded-0 d-flex justify-content-center align-items-center text-center p-3" style={{ height: '325px' }}>
            <h3>Benefits Your Community</h3>
            <br />
            <Image src="./images/benifitCommunityAbout.png" alt="People working together" className="d-block" style={{ width: '45%' }} />
            <p>Creates a lasting positive impact</p>
          </Card>
        </Col>
      </Row>
    </Container>
    <Container className="p-3">
      <h1>Our Team</h1>

      <h3>Sara Kenley</h3>
      <p>Founder</p>
    </Container>
    <Container>
      <h1>Contact Us</h1>
      <p>sarakenley@thevoluntree.com</p>
    </Container>
  </>
);

export default About;
