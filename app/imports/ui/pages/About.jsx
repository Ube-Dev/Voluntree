import React from 'react';
import { Col, Container, Row, Card, Image } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const About = () => (
  <>
    <Container id={PAGE_IDS.ABOUT} fluid className="about-background p-0">
      <h1>Who We Are</h1>
    </Container>
    <Container className="p-3">
      <Row className="m-auto align-items-stretch align-content-stretch text-center flex-column flex-md-row">
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
      <Row className="m-5 flex-column flex-md-row">
        <h1 className="text-center">The Voluntree:</h1>
      </Row>
      <Row className="m-auto align-items-stretch align-content-stretch text-center flex-column flex-md-row">
        <Col className="col-md-4 mb-4">
          <Card className="rounded-0 d-flex flex-column justify-content-center align-items-center text-center p-3 h-100">
            <h3>Makes Working Together Simple</h3>
            <br />
            <Image src="./images/workTogetherAbout.png" alt="People working together" className="d-block" style={{ width: '32%' }} />
            <p>Removes barriers for volunteers to connect.</p>
          </Card>
        </Col>
        <Col className="col-md-4 mb-4">
          <Card className="rounded-0 d-flex flex-column justify-content-center align-items-center text-center p-3 h-100">
            <h3>Unlocks Your Potential</h3>
            <br />
            <Image src="./images/growthAbout.png" alt="People working together" className="d-block" style={{ width: '32%' }} />
            <p>Provides opportunities to grow and learn</p>
          </Card>
        </Col>
        <Col className="col-md-4 mb-4">
          <Card className="rounded-0 d-flex flex-column justify-content-center align-items-center text-center p-3 h-100">
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
    <Container fluid className="color2 p-3 justify-content-center">
      <Row className="mx-auto flex-column flex-md-row">
        <Col className="col-md-6 mx-auto mb-4 px-lg-5">
          <h1>Contact Us</h1>
          <p>sarakenley@thevoluntree.com</p>
          <p>Inquiries? Leave a message or email us, and we will be happy to answer your question.</p>
        </Col>
        <Col className="col-md-6 mx-auto justify-content-center">
          <form className="mx-auto">
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="message">Message:</label>
              <textarea className="form-control" id="message" rows="4" />
            </div>
            <button type="button" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  </>
);

export default About;
