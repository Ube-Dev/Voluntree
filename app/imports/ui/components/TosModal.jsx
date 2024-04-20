import React, { useState } from 'react';
import '../css/EventPage.css';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import checkMark from './CheckMark';

const TosModal = ({ handleAccept, handleDecline }) => {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="text-center">
        <Button className="align-content-center" variant="primary" onClick={handleShow}> Terms of Service </Button>                 {checkMark(accepted)}
      </div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Terms of Service</Modal.Title>
        </Modal.Header>

        <Modal.Body className="scrollModal">
          <strong> Welcome to Voluntree! </strong><br /> These Terms of Use and Service ( &quot; Terms &quot;) govern your access to and use of the Voluntree website and services (collectively, the &quot; Services &quot;).
          By accessing or using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Services.
          <br />
          <strong> 1. Acceptance of Terms </strong><br />
          By using the Services, you agree to comply with and be legally bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
          <br />
          <strong>2. Description of Services</strong><br />
          Voluntree provides a platform for volunteers to connect with organizations hosting events and activities in need of assistance. Volunteers can search for events based on location, date, and type of activity.
          <br />
          <strong>3. Registration</strong><br />
          In order to access certain features of the Services, you may be required to register for an account.
          You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          <br />
          <strong>4. User Conduct</strong><br />
          You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:
          <br />
          Use the Services in any way that violates any applicable law or regulation.
          Use the Services to harass, abuse, or harm another person.
          Use the Services to upload, post, or transmit any content that is unlawful, harmful, threatening,
          abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another&lsquote;s privacy, hateful, or racially, ethnically, or otherwise objectionable.
          <br />
          <strong>5. Intellectual Property</strong><br />
          All content included on the Voluntree website, including text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software,
          is the property of Voluntree or its content suppliers and protected by international copyright laws.
          <br />
          <strong>6. Limitation of Liability</strong><br />
          In no event shall Voluntree or its affiliates, directors, officers, employees, agents, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from
          (i) your access to or use of or inability to access or use the Services;
          (ii) any conduct or content of any third party on the Services;
          (iii) any content obtained from the Services; and
          (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory.
          <br />
          <strong>7. Modification of Terms</strong><br />
          Voluntree reserves the right to modify these Terms at any time.
          Changes will become effective immediately upon posting on the website. Your continued use of the Services following the posting of changes constitutes your acceptance of such changes.
          <br />
          <strong>8. Governing Law</strong><br />
          These Terms shall be governed by and construed in accordance with the laws of the State of Hawaii, without regard to its conflict of law principles.
          <br />
          <strong>9. Contact Us</strong><br />
          If you have any questions about these Terms, please contact us at contact@voluntree.com.
          <br />
          By using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and Service.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { handleAccept(); setAccepted(true); handleClose(); }}>
            Accept
          </Button>
          <Button variant="secondary" onClick={() => { handleDecline(); setAccepted(false); handleClose(); }}>
            Decline
          </Button>
          <br />
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default TosModal;
TosModal.propTypes = {
  handleAccept: PropTypes.func,
  handleDecline: PropTypes.func,
}.isRequired;
