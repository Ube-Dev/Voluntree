import React, { useState } from 'react';
import '../css/EventPage.css';
import { Button, Modal } from 'react-bootstrap';

const SkillChooserModal = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="text-center">
        <Button className="align-content-center" variant="primary" onClick={handleShow}> Add Skills </Button>
      </div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Skills</Modal.Title>
        </Modal.Header>

        <Modal.Body className="scrollModal" />
        <Modal.Footer />
      </Modal>
    </>
  );
};
export default SkillChooserModal;
