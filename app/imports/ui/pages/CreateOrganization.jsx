import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Organization } from '../../api/organization/OrganizationCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { createEvent } from '../../startup/both/Methods';
import swal from 'sweetalert';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const CreateOrganization = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    leader: { type: String },
    organizationID: { type: String, optional: true },
    name: { type: String },
    image: { type: String, optional: true, defaultValue: defaultOrganizationImage },
    location: { type: String, defaultValue: '' },
    mission: { type: String, defaultValue: '' },
    type: { type: String, allowedValues: organizationType, optional: true },
    description: { type: String, optional: true, defaultValue: '' },
    phone: { type: String, optional: true, defaultValue: '' },
    email: { type: String, optional: true, defaultValue: '' },
    hasPhysicalAddress: { type: Boolean, optional: true, defaultValue: false },
    address: { type: String, optional: true, defaultValue: '' },
    zipCode: { type: String, optional: true, defaultValue: '' },
    city: { type: String, optional: true, defaultValue: '' },
    state: { type: String, optional: true, defaultValue: '' },
    country: { type: String, optional: true, defaultValue: '' },
    pastEvents: { type: Array, optional: true, defaultValue: [] },
    'pastEvents.$': { type: String },
    onGoingEvents: { type: Array, optional: true, defaultValue: [] },
    'onGoingEvents.$': { type: String },
    members: { type: Array, optional: true, defaultValue: [] },
    'members.$': { type: String },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle Organization creation submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    // On submit, insert the data.
    const submit = (data, formRef) => {
      const { organizationID, name, image, location, mission, type, description, phone, email, hasPhysicalAddress, address, zipCode, city, state, country } = data;
      const leader = Meteor.user();
      const definitionData = { leader, organizationID, name, image, location, mission, type, description, phone, email, hasPhysicalAddress, address, zipCode, city, state, country };
      Meteor.call(createEvent, definitionData, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', `Welcome to Voluntree, ${name}`, 'success')));
      formRef.reset();
    };
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to="/Dashboard" />;
  }
  return (
    <Container id={PAGE_IDS.SIGN_UP_ORGANIZATION} fluid className="formCSS">
      <Row className="justify-content-center py-3 signup-background">
        <Col xs={5}>
          <Col className="text-center py-2 login-text">
            <h2>Register Organization</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_ORGANIZATION_ID} name="organizationID" placeholder="Organization ID" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_NAME} name="name" placeholder="Name" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="Email address" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary" className="under-login">
            <Link to="/signin" className="under-login">Already have an account? Login here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateOrganization;
