import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const Faq = () => (
  <Container id={PAGE_IDS.FAQ} className="py-3 d-flex justify-content-center align-items-center">
    <h1 className="faq-header py-3 text-center" style={{ marginBottom: '10px' }}>Frequently Asked Questions(FAQ)</h1>
    <Row>
      <Col>
        <Accordion>
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
        </Accordion>
      </Col>
    </Row>

    <h3 className="color2">Q: How do organizations join the platform?</h3>
    <p>A: Organizations can register by clicking on the &quot;Partner with Us&quot; button on our home page. Fill out the necessary information, and our team will review and approve your organization&apos;s profile.</p>

    <h3 className="color2">Q: Is there a cost for using the platform?</h3>
    <p>A: Voluntree is free for volunteers. Organizations pay a fee. Contact us for pricing.</p>

    <h3 className="color2">Q: How are matches determined?</h3>
    <p>A: Volunteers are matched based on the skills users have given. They can search for events and organizations that need volunteers.</p>

    <h3 className="color2">Q: Can I browse volunteer opportunities without signing up?</h3>
    <p>A: Yes, browsing opportunities is available. To volunteer, sign-up is required.</p>
  </Container>
);

export default Faq;
