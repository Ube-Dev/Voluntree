import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MailingList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Join Mailing List
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Join Our Mailing List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMailingListEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" id="mailingListEmail" autoComplete="email" />
              <Form.Text className="text-muted">
                We&apos;ll never share your email with anyone else.
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
