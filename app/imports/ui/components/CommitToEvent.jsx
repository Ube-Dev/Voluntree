import React from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Button, Container } from 'react-bootstrap';
import { updateUserProfile } from '../../startup/both/Methods';

/* Component will allow volunteers to commit/submit to an event and update the events page for the organization. */
const commitSubmission = (data) => {
  Meteor.call(updateUserProfile, data, (error) => {
    if (error) {
      swal('Error', error.message, 'error');
    } else {
      swal('Success', 'Review submitted successfully', 'success');
    }
  });
};
const CommitToEvent = (userData) => (
  <Container className="d-flex justify-content-end">
    <Button id="commit-button" className="mx-2" variant="success" onClick={() => commitSubmission(userData)}>Commit</Button>
    <Button id="connect-button" className="mx-2" variant="success" onClick={() => commitSubmission(userData)}>Connect</Button>
    {console.log(userData)}
  </Container>
);

export default CommitToEvent;
