import React from 'react';
// import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserProfiles } from '../../api/user/UserProfileCollection';

const bridge = new SimpleSchema2Bridge(UserProfiles);

const EditUserProfile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  /* const { doc, ready } = useTracker(() => {
    // const currentUser = Meteor.user();
    // Get access to Profile documents.
    const subscription = UserProfiles.subscribeUser();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = UserProfiles.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]); */
  const { ready, userProfile } = useTracker(() => {
    const currentUser = Meteor.user(); // Retrieve the current user
    const subscription = currentUser ? UserProfiles.subscribeUser() : null; // Subscribe to userProfile publication for the current user
    const profile = currentUser ? UserProfiles.findOne({ userID: currentUser._id }) : null; // Query user profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      userProfile: profile,
    };
  });
  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, image, phone } = data;
    /* UserProfiles.update((error) => {
      return (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Profile updated successfully.', 'success'));
    });*/
  };
  return ready ? (
    <Container className="py-3 formCSS">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="pb-2 text-center"><h2>Edit User Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={userProfile}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="firstName" label="First Name" /></Col>
                  <Col><TextField name="lastName" label="Last Name" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="username" /></Col>
                  <Col><TextField name="profilePictureLink" label="Profile Picture" /></Col>
                </Row>
                <Row>
                  <Col><LongTextField name="description" label="Your Bio" /></Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditUserProfile;
