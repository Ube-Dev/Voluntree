import React, { useState } from 'react';
import '../css/EventPage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

const TosModal = ({ handleAccept }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow}> Terms of Service </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Terms of service not Accepted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please Review and accept the Terms Of Service before proceeding.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Decline
          </Button>
          <br />
          <Button variant="primary" onClick={() => { handleAccept(); handleClose(); }}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default TosModal;
TosModal.propTypes = {
  handleAccept: PropTypes.func,
}.isRequired;
