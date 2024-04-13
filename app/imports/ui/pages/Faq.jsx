import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const Faq = () => (
  <Container id={PAGE_IDS.FAQ} fluid className="color2">
    <Container className="py-3">
      <h1 className="py-3 text-center">Frequently Asked Questions(FAQ)</h1>
      <Row className="justify-content-center">
        <Col className="col-md-8">
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Q: How do volunteers connect with organizations?</Accordion.Header>
              <Accordion.Body>
                A: Voluntree allows users to sign-up and find organizations looking for help.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Q: How do I sign up as a volunteer?</Accordion.Header>
              <Accordion.Body>
                A: Simply visit our website and click on the &quot;Sign-Up&quot; button. Follow the prompts to create your profile, providing information about your skills, interests, and availability.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Q: How do I sign up as an organization?</Accordion.Header>
              <Accordion.Body>
                A: Organizations can register by clicking on the &quot;Partner with Us&quot; button on our home page. Fill out the necessary information, and our team will review and approve your organization&apos;s profile.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Q: Is there a cost for using the platform?</Accordion.Header>
              <Accordion.Body>
                A: Voluntree is free for volunteers. Organizations pay a fee. Contact us for pricing.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Q: How are matches determined?</Accordion.Header>
              <Accordion.Body>
                A: Volunteers are matched based on the skills users have given. They can search for events and organizations that need volunteers.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Q: What if I need to cancel my volunteer commitment?</Accordion.Header>
              <Accordion.Body>
                A: Contact the organization directly to cancel your commitment.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default Faq;
