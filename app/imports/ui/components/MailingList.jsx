import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MailingList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="fixed-bottom m-3" style={{ right: 0, position: 'fixed' }}>
        Join Mailing List
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join Our Mailing List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={handleClose}>
              Subscribe
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MailingList;
