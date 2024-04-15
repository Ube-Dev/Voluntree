import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ConnectButton = ({ org }) => (
  <Button id="connect-button" variant="primary" href={`mailto:${org.contactEmail}`}>
    Connect
  </Button>
);

ConnectButton.propTypes = {
  org: PropTypes.shape({
    contactEmail: PropTypes.string,
  }).isRequired,
};
export default ConnectButton;
