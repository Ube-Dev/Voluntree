import React, { useState } from 'react';
import swal from 'sweetalert';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Organization } from '../../api/organization/OrganizationCollection';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import { updateOrganization } from '../../startup/both/Methods';

const bridge = new SimpleSchema2Bridge(Organization._schema);

const EditOrganizationProfile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();

  // For expanding the form depending on whether organization has a physical address.
  const [hasAddress, setHasAddress] = useState(false);

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, organizationProfile } = useTracker(() => {
    const currentUser = Meteor.user(); // Retrieve the current user
    const subscription = currentUser ? Organization.subscribeOrganization() : null; // Subscribe to Organization publication for the current organization
    const profile = currentUser ? Organization.findOne({ _id: _id }) : null; // Query user profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      organizationProfile: profile,
    };
  });

  // On successful submit, insert the data.
  const submit = (data) => {
    const { contactEmail, name, image, mission, type, phone, hasPhysicalAddress, address, zipCode, city, state, country } = data;
    Meteor.call(
      updateOrganization,
      _id,
      { contactEmail, name, image, mission, type, phone, hasPhysicalAddress, address, zipCode, city, state, country },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Profile updated successfully.', 'success')
      ),
    );
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_USER_PROFILE} fluid className="py-3 edit-page-background editCSS">
      <Row className="justify-content-center">
        <Col xs={8}>
          <Col className="pb-2 text-center login-text"><h2>Edit Organization Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={organizationProfile}>
            <Card>
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
          <Alert variant="secondary">
            <Link to="/dashboard"><Button>Return to Dashboard</Button></Link>
          </Alert>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditOrganizationProfile;
