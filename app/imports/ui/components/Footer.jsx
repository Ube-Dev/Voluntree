import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer className="mt-auto bg-light">
      <Container style={divStyle}>
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
                <a href="/">Landing</a> <br />
                <a href="/about">About Us</a> <br />
                <a href="/FAQ">FAQ</a> <br />
                <a href="/subscribe">Subscribe</a> <br />
              </Col>
              <Col>
                <a href="/home">Home</a> <br />
                <a href="/Events">Find Events</a> <br />
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={3}>
            <hr />
            <h6>Contact Us</h6>
            <p>sarakenley@thevoluntree.com</p>
            <hr />
            <h6>Become an Organization</h6>
            <a href="/createOrganization">Create Organization</a>
          </Col>
          <Col sm={12} md={4} className="text-start">
            <hr />
            Created by <a href="https://ube-dev.github.io/">Ube-Dev</a> <br />
            Based on a template provided by <br />
            the Department of Information and Computer Sciences <br />
            University of Hawaii<br />
            Honolulu, HI 96822 <br />
            <a href="http://ics-software-engineering.github.io/meteor-application-template-production">Template Home Page</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
