import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import '../css/Footer.css';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto bg-light">
    <Container id="footer-container">
      <Row className="mb-3">
        <Col sm={12} md={3}>
          <hr />
          <Image src="/images/voluntreeLanding1.png" width="150px" /> <br />
        </Col>
        <Col sm={12} md={3}>
          <hr />
          <h5>Quick Links</h5>
          <Link to="/">Landing</Link> <br />
          <Link to="/about">About Us</Link> <br />
          <Link to="/FAQ">FAQ</Link> <br />
          <Link to="/home">Home</Link> <br />
          <Link to="/Events">Find Events</Link> <br />
        </Col>
        <Col sm={12} md={3}>
          <hr />
          <h6>Contact Us</h6>
          <p>sarakenley@thevoluntree.com</p>
          <hr />
          <h6>Become an Organization</h6>
          <Link to="/createOrganization">Create Organization</Link>
        </Col>
        <Col sm={12} md={3} className="text-start">
          <hr />
          Created by <a href="https://ube-dev.github.io/" target="_blank" rel="noopener noreferrer">Ube-Dev</a> <br />
          Based on a template provided by <br />
          the Department of Information and Computer Sciences <br />
          University of Hawaii<br />
          Honolulu, HI 96822 <br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-production" target="_blank" rel="noopener noreferrer">
            Template Home Page
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
