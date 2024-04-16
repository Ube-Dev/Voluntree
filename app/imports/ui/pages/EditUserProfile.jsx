import React from 'react';
import swal from 'sweetalert';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { updateUserProfile } from '../../startup/both/Methods';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import SkillChooserModal from '../components/SkillChooserModal';

const bridge = new SimpleSchema2Bridge(UserProfiles._schema);

const EditUserProfile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, userProfile } = useTracker(() => {
    const currentUser = Meteor.user(); // Retrieve the current user
    const subscription = currentUser ? UserProfiles.subscribeUser() : null; // Subscribe to userProfile publication for the current user
    const profile = currentUser ? UserProfiles.findOne(_id) : null; // Query user profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      userProfile: profile,
    };
  });

  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, image, phone, address, zipCode, city, state, country, skills } = data;
    Meteor.call(
      updateUserProfile,
      _id,
      { firstName, lastName, image, phone, address, zipCode, city, state, country, skills },
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
          <Col className="pb-2 text-center login-text"><h2>Edit User Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={userProfile}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_FIRST_NAME} name="firstName" label="First Name" /></Col>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_LAST_NAME} name="lastName" label="Last Name" /></Col>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_PROFILE_PICTURE_URL} name="image" label="Profile Picture URL" /></Col>
                </Row>
                <Row>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_ADDRESS} name="address" label="Address" /></Col>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_PHONE} name="phone" label="Phone" /></Col>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_EMAIL} name="email" label="EmailPage" /></Col>
                </Row>
                <Row>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_CITY} name="city" label="City" /></Col>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_STATE} name="state" label="State" /></Col>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_COUNTRY} name="country" label="Country" /></Col>
                  <Col><TextField id={COMPONENT_IDS.EDIT_USER_PROFILE_ZIP_CODE} name="zipCode" label="Zip Code" /></Col>
                </Row>
                <HiddenField name="role" />
                <HiddenField name="userID" />
              </Card.Body>
              <Card.Footer>
                <SkillChooserModal />
                <SubmitField id={COMPONENT_IDS.EDIT_USER_PROFILE_SUBMIT} value="Update" />
                <ErrorsField />
              </Card.Footer>
            </Card>
          </AutoForm>
          <Alert className="mt-3" variant="secondary">
            <Link to="/profile"><Button>Return to Profile</Button></Link>
          </Alert>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditUserProfile;
