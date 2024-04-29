import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ConnectButton = ({ org }) => (
  <Button id="connect-button" className="commit-btn" variant="success">
    <a className="text-decoration-none" href={`mailto:${org.contactEmail}`}>
      Connect
    </a>
  </Button>
);

ConnectButton.propTypes = {
  org: PropTypes.shape({
    contactEmail: PropTypes.string,
  }).isRequired,
};
export default ConnectButton;
