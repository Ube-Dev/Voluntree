import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Organization } from '../../api/organization/OrganizationCollection';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import { updateOrganization } from '../../startup/both/Methods';
import '../css/EditOrganizationProfile.css';

const updateSchema = new SimpleSchema({
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

const bridge = new SimpleSchema2Bridge(updateSchema);

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
        swal('Success', 'Organization profile updated successfully.', 'success')
      ),
    );
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_ORGANIZATION_PROFILE} fluid className="py-3 edit-org-form color2">
      <Container className="mb-5 mt-3">
        <Row className="justify-content-center">
          <Col md={8} xs={12}>
            <Col className="pb-2 text-center login-text"><h2>Edit Organization Profile</h2></Col>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={organizationProfile}>
              <Card>
                <Card.Header className="section-header">Organization Details</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <TextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_NAME} name="name" placeholder="Name" />
                    </Col>
                    <Col>
                      <TextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_IMAGE} name="image" placeholder="Image" label="Image URL" required />
                    </Col>
                  </Row>
                  <LongTextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_MISSION} name="mission" placeholder="Mission" />
                  <Row>
                    <Col>
                      <SelectField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_TYPE} name="type" placeholder="Type" />
                    </Col>
                    <Col>
                      <TextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_PHONE} name="phone" placeholder="Phone" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_CONTACT_EMAIL} name="contactEmail" placeholder="Email" />
                    </Col>
                    <Col>
                      <label htmlFor="hasPhysicalAddress">Has Physical Address?
                        <input
                          type="checkbox"
                          id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_HAS_PHYSICAL_ADDRESS}
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
                    <SubmitField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_SUBMIT} />
                  </Card.Footer>
                )}
              </Card>
              {hasAddress && (
                <Card className="mt-3 rounded-4">
                  <Card.Header className="section-header">Location</Card.Header>
                  <Card.Body>
                    <Row>
                      <TextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_ADDRESS} name="address" placeholder="Address" />
                    </Row>
                    <Row>
                      <Col>
                        <TextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_CITY} name="city" placeholder="City" />
                      </Col>
                      <Col>
                        <TextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_STATE} name="state" placeholder="State" />
                      </Col>
                      <Col>
                        <TextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_ZIP_CODE} name="zipCode" placeholder="Zip Code" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <TextField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_COUNTRY} name="country" placeholder="Country" />
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <ErrorsField />
                    <SubmitField id={COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_SUBMIT} />
                  </Card.Footer>
                </Card>
              )}
            </AutoForm>
          </Col>
        </Row>
        <Row className="pt-4 text-center">
          <Link to="/dashboard"><Button>Return to Dashboard</Button></Link>
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditOrganizationProfile;
