import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer className="mt-1 mb-3 bg-light">
      <Container style={divStyle}>
        <Row>
          <Col sm={12} md={4}>
            <hr />
            <Image src="/images/voluntreeLanding1.png" width="150px" />
          </Col>
          <Col sm={12} md={4}>
            <hr />
            <h5>Quick Links</h5>
            <a href="/">Landing</a> <br />
            <a href="/about">About Us</a> <br />
            <a href="/FAQ">FAQ</a> <br />
            <a href="/home">Home</a> <br />
            <a href="/Events">Find Events</a> <br />
            <a href="/about/contact">Contact Us</a> <br />
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
