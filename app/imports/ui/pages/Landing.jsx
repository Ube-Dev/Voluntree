import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import '../css/Landing.css';
import { PAGE_IDS } from '../utilities/PageIDs';
import MailingList from '../components/MailingList';

const Landing = () => (
  <>
    <MailingList />
    <Container fluid id={PAGE_IDS.LANDING} className="landing-background p-0">
      <Row className="align-middle text-center">
        <Col xs={12} className="justify-content-center mt-4">
          <Image src="/images/voluntreeLogo.png" alt="Voluntree Logo" className="mx-auto d-block" style={{ width: '75%' }} />
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
        <h1 style={{ color: 'gold' }}>Your Path to Meaningful Volunteering</h1>
        <h5>Designed to connect passionate individuals like you with organizations</h5>
        <Row className="align-content-center p-4">
          <Col className="col-12 col-sm-4">
            <Image src="/images/landingPage/landing-img1.jpg" alt="Landing Image 1" className="align-content-center" style={{ width: '85%' }} />
          </Col>
          <Col className="col-12 col-sm-4 align-content-center">
            <Image src="/images/landingPage/landing-img2.jpg" alt="Landing Image 2" className="align-content-center" style={{ width: '85%' }} />
          </Col>
          <Col className="col-12 col-sm-4 align-content-center">
            <Image src="/images/landingPage/landing-img3.jpg" alt="Landing Image 3" className="align-content-center" style={{ width: '85%' }} />
          </Col>
        </Row>
        <h4>Ready to make a positive impact on the world? Welcome to The Voluntree!</h4>
        <Row className="pt-4 pb-2">
          <Col>
            <Button className="btn-browse-events justify-content-center" href="/Events">Find Events</Button>
          </Col>
        </Row>
      </Col>
    </Container>
    <Container fluid className="color1 p-4 d-flex justify-content-center align-items-center">
      <Col className="col-lg-8 col-sm-7 d-flex flex-column align-items-center text-center">
        <h1>How It Works</h1>
        <Row className="align-items-start text-start">
          <h4>1. Create Your Profile:</h4>
          <p>
            Start by creating a profile that highlights your skills and interests. The more details you provide, the better we can match you with the perfect volunteering opportunity.
          </p>
          <h4>2. Discover Opportunities:</h4>
          <p>
            Explore a variety of volunteer opportunities. Browse organizations, causes, and projects that resonate with your values.
          </p>
          <h4>3. Connect and Engage:</h4>
          <p>
            When you find a match, connect with the organization directly. Begin your volunteering journey, whether it&apos;s helping out at local events, contributing your professional skills, or participating in impactful projects.
          </p>
          <h4>4. Track Your Impact:</h4>
          <p>
            Keep track of your volunteer hours and the positive impact you&apos;ve made. Our platform allows you to showcase your contributions and be recognized for your dedication.
          </p>
          <h4>Start Your Volunteering Journey Today</h4>
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
