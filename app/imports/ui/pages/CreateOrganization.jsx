import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { createOrganization } from '../../startup/both/Methods';

const formSchema = new SimpleSchema({
  leader: { type: String, optional: true },
  organizationID: { type: String, optional: true },
  name: { type: String, optional: false },
  image: { type: String, optional: true },
  mission: { type: String, optional: false },
  type: { type: String, allowedValues: ['Organization', 'School', 'Individual'], optional: false },
  phone: { type: String, optional: false },
  email: { type: String, optional: false },
  hasPhysicalAddress: { type: Boolean, optional: false, defaultValue: false },
  address: { type: String, optional: true },
  zipCode: { type: String, optional: true },
  city: { type: String, optional: true },
  state: { type: String, optional: true },
  country: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const CreateOrganization = () => {
  const [hasPhysicalAddress, setHasPhysicalAddress] = useState(false);

  const submit = (data, formRef) => {
    const { organizationID, name, image, mission, type, phone, email, address, zipCode, city, state, country } = data;
    const leader = Meteor.user().userID;
    console.log(leader);
    const definitionData = { leader, organizationID, name, image, mission, type, phone, email, hasPhysicalAddress, address, zipCode, city, state, country };
    Meteor.call(createOrganization, definitionData, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', `Welcome to Voluntree, ${name}`, 'success')));
    formRef.reset();
  };

  let fRef = null;
  return (
    <Container id={PAGE_IDS.SIGN_UP_ORGANIZATION} fluid className="color2">
      <Container className="mb-5 mt-3">
        <Row className="justify-content-center">
          <Col md={8} xs={12}>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card className="rounded-4">
                <Card.Header className="section-header">Organization Details</Card.Header>
                <Card.Body>
                  <HiddenField id={COMPONENT_IDS.SIGN_UP_FORM_LEADER} name="leader" />
                  <Row>
                    <Col>
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_NAME} name="name" placeholder="Name" />
                    </Col>
                    <Col>
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_IMAGE} name="image" placeholder="Image" />
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
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="Email" />
                    </Col>
                    <Col>
                      <label htmlFor="hasPhysicalAddress">Has Physical Address?</label>
                      <input
                        type="checkbox"
                        id={COMPONENT_IDS.SIGN_UP_FORM_HAS_PHYSICAL_ADDRESS}
                        name="hasPhysicalAddress"
                        checked={hasPhysicalAddress}
                        onChange={() => setHasPhysicalAddress(!hasPhysicalAddress)}
                      />
                    </Col>
                  </Row>
                </Card.Body>
                {!hasPhysicalAddress && (
                  <Card.Footer>
                    <ErrorsField />
                    <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
                  </Card.Footer>
                )}
              </Card>
              {hasPhysicalAddress && (
                <Card className="mt-3 rounded-4">
                  <Card.Header className="section-header">Location</Card.Header>
                  <Card.Body>
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_ADDRESS} name="address" placeholder="Address" />
                    <Row>
                      <Col>
                        <TextField id={COMPONENT_IDS.SIGN_UP_FORM_ZIP_CODE} name="zipCode" placeholder="Zip Code" />
                      </Col>
                      <Col>
                        <TextField id={COMPONENT_IDS.SIGN_UP_FORM_CITY} name="city" placeholder="City" />
                      </Col>
                      <Col>
                        <TextField id={COMPONENT_IDS.SIGN_UP_FORM_STATE} name="state" placeholder="State" />
                      </Col>
                      <Col>
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
