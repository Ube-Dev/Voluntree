import React from 'react';
import swal from 'sweetalert';
import { Button, Container } from 'react-bootstrap';

/* Component will allow volunteers to commit/submit to an event and update the events page for the organization. */
const commitSubmission = () => {
  swal('Success', 'Successfully registered for event.', 'success');
};
const CommitToEvent = () => (
  <Container className="d-flex justify-content-end">
    <Button id="commit-button" className="mx-2" variant="success" onClick={() => commitSubmission()}>Commit</Button>
    <Button id="connect-button" className="mx-2" variant="success" onClick={() => commitSubmission()}>Connect</Button>
  </Container>
);

export default CommitToEvent;
