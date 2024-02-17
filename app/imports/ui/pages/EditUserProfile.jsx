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
    const { firstName, lastName, image, phone, bookmarks, viewingHistory, pastEvents, onGoingEvents, userActivity,
      totalHours, address, zipCode, city, state, country, feedbacks, skills, followers, organizationFollowed, memberOf } = data;
    UserProfiles.update(
      _id,
      { firstName, lastName, image, phone, bookmarks, viewingHistory, pastEvents, onGoingEvents, userActivity,
        totalHours, address, zipCode, city, state, country, feedbacks, skills, followers, organizationFollowed, memberOf },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Profile updated successfully.', 'success')
      ),
    );
  };
  return ready ? (
    <Container fluid className="py-3 edit-page-background">
      <Row className="justify-content-center">
        <Col xs={8}>
          <Col className="pb-2 text-center login-text"><h2>Edit User Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={userProfile}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="firstName" label="First Name" /></Col>
                  <Col><TextField name="lastName" label="Last Name" /></Col>
                  <Col><TextField name="image" label="Profile Picture URL" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="address" label="Address" /></Col>
                  <Col><TextField name="phone" label="Phone" /></Col>
                  <Col><TextField name="email" label="Email" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="city" label="City" /></Col>
                  <Col><TextField name="state" label="State" /></Col>
                  <Col><TextField name="country" label="Country" /></Col>
                  <Col><TextField name="zipCode" label="Zip Code" /></Col>
                </Row>
                <HiddenField name="role" />
                <HiddenField name="userID" />
                <SubmitField value="Update" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            <Link to="/profile"><Button>Return to Profile</Button></Link>
          </Alert>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditUserProfile;
