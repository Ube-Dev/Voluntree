import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Button } from 'react-bootstrap';

/* Component will allow volunteers to commit/submit to an event and update the events page for the organization. */
const commitSubmission = () => {

};
const CommitToEvent = ({ stuff }) => (
  <Button id="commit-button" className="mx-2" variant="danger" onClick={() => commitSubmission()}>Commit</Button>
);

// Require a document to be passed to this component.
CommitToEvent.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default CommitToEvent;
