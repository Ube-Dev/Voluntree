import React, { useState } from 'react';
import '../css/EventPage.css';
import { Button, Card, Modal } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';

const SkillChooserModal = () => {
  const { skills } = useTracker(() => {
    const skillList = ['12', '13', '14'];
    return {
      skills: skillList,
    };
  });
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="text-center">
        <Button variant="primary" onClick={handleShow}> Add Skills </Button>
      </div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Skills</Modal.Title>
        </Modal.Header>

        <Modal.Body className="scrollModal">

          <Card>
            Skills to add.
          </Card>
          <Card>
            this is where skills go.
          </Card>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
};
export default SkillChooserModal;
