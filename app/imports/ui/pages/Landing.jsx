import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const Landing = () => (
  <>
    <Container fluid id={PAGE_IDS.LANDING} className="landing-background p-0">
      <Row className="align-middle text-center">
        <Col xs={12} className="justify-content-center mt-4">
          <Image src="/images/landingPage/voluntreeLanding1.png" alt="Voluntree Logo" className="mx-auto d-block" style={{ width: '75%' }} />
          <h2>Working together made simple</h2>
        </Col>
      </Row>
      <Row className="mt-2 mb-5 g-0 justify-content-center">
        <Col xs="auto">
          <Button className="rounded-0" variant="outline-light-landing" size="lg" href="/signin">
            Sign In
          </Button>
        </Col>
        <Col xs="auto">
          <Button className="rounded-0" variant="light" size="lg" href="/signup">
            Register
          </Button>
        </Col>
      </Row>
    </Container>
    <Container fluid className="color2 p-4 d-flex justify-content-center align-items-center">
      <Col className="col-11 text-center">
        <h2 style={{ color: 'gold' }}>Your Path to Meaningful Volunteering</h2>
        <h5>
          Ready to make a positive impact on the world? Welcome to The Voluntree!
        </h5>
        <Row className="align-content-center pt-1 pb-3">
          <Col className="col-12 col-sm-4">
            <Image src="/images/landingPage/landing-img1.jpg" alt="Landing Image 1" className="align-content-center" style={{ width: '75%' }} />
          </Col>
          <Col className="col-12 col-sm-4 align-content-center">
            <Image src="/images/landingPage/landing-img2.jpg" alt="Landing Image 2" className="align-content-center" style={{ width: '75%' }} />
          </Col>
          <Col className="col-12 col-sm-4 align-content-center">
            <Image src="/images/landingPage/landing-img3.jpg" alt="Landing Image 3" className="align-content-center" style={{ width: '75%' }} />
          </Col>
        </Row>
        <h5>Designed to connect passionate individuals like you with organizations.</h5>
      </Col>
    </Container>
    <Container fluid className="color1 p-4 d-flex justify-content-center align-items-center">
      <Col className="col-7 d-flex flex-column align-items-center text-center">
        <h2>How It Works</h2>
        <Row className="align-items-start text-start">
          <h5>1. Create Your Profile:</h5>
          <p>
            Start by creating a profile that highlights your skills and interests. The more details you provide, the better we can match you with the perfect volunteering opportunity.
          </p>
          <h5>2. Discover Opportunities:</h5>
          <p>
            Explore a variety of volunteer opportunities. Browse organizations, causes, and projects that resonate with your values.
          </p>
          <h5>3. Connect and Engage:</h5>
          <p>
            When you find a match, connect with the organization directly. Begin your volunteering journey, whether it&apos;s helping out at local events, contributing your professional skills, or participating in impactful projects.
          </p>
          <h5>4. Track Your Impact:</h5>
          <p>
            Keep track of your volunteer hours and the positive impact you&apos;ve made. Our platform allows you to showcase your contributions and be recognized for your dedication.
          </p>
          <h5>Start Your Volunteering Journey Today</h5>
          <p>
            Join The Voluntree community and embark on a journey of purposeful volunteering. Together, we can create a world where every act of kindness leaves a lasting impact.
          </p>
          <p>
            Ready to get started? Sign up now and let&apos;s grow The Voluntree together!
          </p>
          <p>
            <a className="landing-link" href="/signup">Sign Up</a> | <a className="landing-link" href="/about">Learn More</a>
          </p>
        </Row>
      </Col>
    </Container>
  </>
);

export default Landing;
