import React from 'react';
import { Col, Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Faq = () => (
  <Container id={PAGE_IDS.FAQ} className="py-3">
    <Col className="col-lg-8">
      <h1>FAQ</h1>

      <h3>Q: How do volunteeres connect with organizations?</h3>
      <p>Voluntree allows users to sign-up and find organizations looking for help.</p>

      <h3>Q:How do I sign up as a volunteer?</h3>
      <p>Simply visit our website and click on the &quot;Sign-Up&quot; button. Follow the prompts to create your profile, providing information about your skills, interests, and availability.</p>

      <h3>Q: How do organizations join the platform?</h3>
      <p>Organizations can register by clicking on the &quot;Partner with Us&quot; button on our home page. Fill out the necessary information, and our team will review and approve your organization&apos;s profile.</p>

      <h3>Q: Is there a cost for using the platform?</h3>
      <p>Voluntree is free for volunteers. Organizations pay a fee. Contact us for pricing.</p>

      <h3>Q: How are matches determined?</h3>
      <p>Volunteers are matched based on the skills users have given. They can search for events and organizations that need volunteers.</p>

      <h3>Q: Can I browse volunteer opportunities without signing up?</h3>
      <p>Yes, browsing opportunities is avalable. To volunteer, sign-up is required.</p>
    </Col>
  </Container>
);

export default Faq;
