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

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUpOrganization = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    organizationID: String,
    name: String,
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const collectionName = Organization.getCollectionName();
    const definitionData = doc;
    // create the new UserProfile
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        // log the new user in.
        const { email, password } = doc;
        Meteor.loginWithPassword(email, password, (err) => {
          if (err) {
            setError(err.reason);
          } else {
            setError('');
            setRedirectToRef(true);
          }
        });
      })
      .catch((err) => setError(err.reason));
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to="/add" />;
  }
  return (
    <Container id={PAGE_IDS.SIGN_UP_ORGANIZATION} fluid>
      <Row className="justify-content-center py-3" id="signup-background">
        <Col xs={5}>
          <Col className="text-center py-2 login-text">
            <h2>Register Organization</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body className="rounded login">
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_ORGANIZATION_ID} name="organizationID" placeholder="Organization ID" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_NAME} name="name" placeholder="name" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="Email address" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} className="login" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary" className="under-login">
            Already have an account? Login <Link to="/signin" className="under-login">here</Link>
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

export default SignUpOrganization;