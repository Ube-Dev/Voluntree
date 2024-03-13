import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  // Render the signin form.
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/home" />);
  }
  const TosModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Review Privacy Policy
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            Welcome to Voluntree! These Terms of Use and Service ("Terms") govern your access to and use of the Voluntree website and services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Services.

            1. Acceptance of Terms
            By using the Services, you agree to comply with and be legally bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.

            2. Description of Services
            Voluntree provides a platform for volunteers to connect with organizations hosting events and activities in need of assistance. Volunteers can search for events based on location, date, and type of activity.

            3. Registration
            In order to access certain features of the Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.

            4. User Conduct
            You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:

            Use the Services in any way that violates any applicable law or regulation.
            Use the Services to harass, abuse, or harm another person.
            Use the Services to upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.

            5. Intellectual Property
            All content included on the Voluntree website, including text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Voluntree or its content suppliers and protected by international copyright laws.

            6. Limitation of Liability
            In no event shall Voluntree or its affiliates, directors, officers, employees, agents, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; (ii) any conduct or content of any third party on the Services; (iii) any content obtained from the Services; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory.

            7. Modification of Terms
            Voluntree reserves the right to modify these Terms at any time. Changes will become effective immediately upon posting on the website. Your continued use of the Services following the posting of changes constitutes your acceptance of such changes.

            8. Governing Law
            These Terms shall be governed by and construed in accordance with the laws of the State of Hawaii, without regard to its conflict of law principles.

            9. Contact Us
            If you have any questions about these Terms, please contact us at contact@voluntree.com.

            By using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and Service.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  // Otherwise return the Login form.
  return (
    <Container id={PAGE_IDS.SIGN_IN} fluid className="formCSS">
      <Row className="justify-content-center py-3 login-background">
        <Col xs={5}>
          <Col className="text-center py-2 login-text">
            <h2>Login to your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SIGN_IN_FORM_EMAIL} name="email" placeholder="Email address" />
                <TextField id={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_IN_FORM_SUBMIT} />
              </Card.Body>
              {TosModal()}
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            <Link to="/signup" className="under-login">Click here to Register</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
