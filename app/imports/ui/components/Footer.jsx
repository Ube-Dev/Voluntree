import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import '../css/Footer.css';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto bg-light">
    <Container className="footer-container">
      <Row className="mb-3">
        <Col sm={12} md={2}>
          <hr />
          <Image src="/images/voluntreeLogo.png" width="150px" /> <br />
        </Col>
        <Col sm={12} md={3}>
          <hr />
          <h5>Quick Links</h5>
          <Row>
            <Col>
              <a className="footer-link" href="/">Landing</a> <br />
              <a className="footer-link" href="/about">About Us</a> <br />
              <a className="footer-link" href="/FAQ">FAQ</a> <br />
              <a className="footer-link" href="/subscribe">Subscribe</a> <br />
            </Col>
            <Col>
              <a className="footer-link" href="/home">Home</a> <br />
              <a className="footer-link" href="/Events">Find Events</a> <br />
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={3}>
          <hr />
          <h6>Contact Us</h6>
          <p>sarakenley@thevoluntree.com</p>
          <hr />
          <h6>Become an Organization</h6>
          <a className="footer-link" href="/createOrganization">Create Organization</a>
        </Col>
        <Col sm={12} md={4} className="text-start">
          <hr />
          Created by <a href="https://ube-dev.github.io/" target="_blank" rel="noopener noreferrer" className="footer-link">Ube-Dev</a> <br />
          Based on a template provided by <br />
          the Department of Information and Computer Sciences <br />
          University of Hawaii<br />
          Honolulu, HI 96822 <br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-production" target="_blank" rel="noopener noreferrer" className="footer-link">
            Template Home Page
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
