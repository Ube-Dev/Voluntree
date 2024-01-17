import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Faq = () => (
  <Container id={PAGE_IDS.FAQ} className="py-3">
   <Col>
     <h1>FAQ</h1>
      <p>Q: What is this?</p>
      <p>A: This is a template for a Meteor application with React and Bootstrap.</p>
   </Col>
  </Container>
);

export default Faq;
