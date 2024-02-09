import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer className="mt-auto mb-2 bg-light">
      <Container style={divStyle}>
        <Row>
          <Col>
            <hr />
            <Image src="/images/voluntreeLanding1.png" width="150px" />
          </Col>
          <Col>
            <hr />
            <a href="/about">About Us</a> <br />
            <a href="/FAQ">FAQ</a> <br />
          </Col>
          <Col className="text-start">
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
