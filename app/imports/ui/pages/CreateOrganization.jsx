import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { createOrganization, updateUserAccount } from '../../startup/both/Methods';
import { userPrivileges } from '../../api/role/Role';

const formSchema = new SimpleSchema({
  name: { type: String, optional: false },
  image: { type: String, optional: true },
  mission: { type: String, optional: false },
  type: { type: String, allowedValues: ['organization', 'school', 'individual'], optional: false },
  phone: { type: String, optional: false },
  contactEmail: { type: String, optional: false },
  hasPhysicalAddress: { type: Boolean, optional: false, defaultValue: false },
  address: { type: String, optional: true },
  zipCode: { type: String, optional: true },
  city: { type: String, optional: true },
  state: { type: String, optional: true },
  country: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const CreateOrganization = () => {
  const [hasAddress, setHasAddress] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const submit = (data) => {
    const { contactEmail, name, image, mission, type, phone, hasPhysicalAddress, address, zipCode, city, state, country } = data;
    const username = Meteor.user().username;
    const definitionData = { username, contactEmail, name, image, mission, type, phone, hasPhysicalAddress, address, zipCode, city, state, country };
    Meteor.call(createOrganization, definitionData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', `Welcome to Voluntree, ${name}`, 'success')
          .then(() => {
            // Route to another page upon successful submission
            const id = Meteor.userId();
            Meteor.call(updateUserAccount, id, { privilege: [userPrivileges.hasOrganization] }, (updateError) => {
              if (updateError) {
                swal('Error', updateError.message, 'error');
              } else {
                setRedirect(true); // Set submitted to true upon successful submission
              }
            });
          });
      }
    });
  };

  if (redirect) {
    return (<Navigate to="/Dashboard" />); // Redirect to Dashboard upon successful submission
  }

  return (
    <Container id={PAGE_IDS.SIGN_UP_ORGANIZATION} fluid className="color2">
      <Container className="mb-5 mt-3">
        <Row className="justify-content-center">
          <Col md={8} xs={12}>
            <AutoForm schema={bridge} onSubmit={data => submit(data)}>
              <Card className="rounded-4">
                <Card.Header className="section-header">Organization Details</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_NAME} name="name" placeholder="Name" />
                    </Col>
                    <Col>
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_IMAGE} name="image" placeholder="Image" required />
                    </Col>
                  </Row>
                  <LongTextField id={COMPONENT_IDS.SIGN_UP_FORM_MISSION} name="mission" placeholder="Mission" />
                  <Row>
                    <Col>
                      <SelectField id={COMPONENT_IDS.SIGN_UP_FORM_TYPE} name="type" placeholder="Type" />
                    </Col>
                    <Col>
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PHONE} name="phone" placeholder="Phone" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="contactEmail" placeholder="Email" />
                    </Col>
                    <Col>
                      <label htmlFor="hasPhysicalAddress">Has Physical Address?
                        <input
                          type="checkbox"
                          id={COMPONENT_IDS.SIGN_UP_FORM_HAS_PHYSICAL_ADDRESS}
                          name="hasPhysicalAddress"
                          checked={hasAddress}
                          onChange={() => setHasAddress(!hasAddress)}
                          className="m-4"
                        />
                      </label>
                    </Col>
                  </Row>
                </Card.Body>
                {!hasAddress && (
                  <Card.Footer>
                    <ErrorsField />
                    <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
                  </Card.Footer>
                )}
              </Card>
              {hasAddress && (
                <Card className="mt-3 rounded-4">
                  <Card.Header className="section-header">Location</Card.Header>
                  <Card.Body>
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_ADDRESS} name="address" placeholder="Address" />
                    <Row>
                      <Col md={12}>
                        <TextField id={COMPONENT_IDS.SIGN_UP_FORM_CITY} name="city" placeholder="City" />
                      </Col>
                      <Col md={12}>
                        <TextField id={COMPONENT_IDS.SIGN_UP_FORM_STATE} name="state" placeholder="State" />
                      </Col>
                      <Col md={12}>
                        <TextField id={COMPONENT_IDS.SIGN_UP_FORM_ZIP_CODE} name="zipCode" placeholder="Zip Code" />
                      </Col>
                      <Col md={12}>
                        <TextField id={COMPONENT_IDS.SIGN_UP_FORM_COUNTRY} name="country" placeholder="Country" />
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <ErrorsField />
                    <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
                  </Card.Footer>
                </Card>
              )}
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CreateOrganization;
