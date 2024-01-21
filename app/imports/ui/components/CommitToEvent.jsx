import React from 'react';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';

/* Component will allow volunteers to commit/submit to an event and update the events page for the organization. */
const commitSubmission = () => {
  swal('Success', 'Successfully registered for event.', 'success');
};
const CommitToEvent = () => (
  <Button id="commit-button" className="mx-2" variant="success" onClick={() => commitSubmission()}>Join</Button>
);

export default CommitToEvent;
