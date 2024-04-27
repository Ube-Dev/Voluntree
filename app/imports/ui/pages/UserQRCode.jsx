import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { PAGE_IDS } from '../utilities/PageIDs';

const UserQRCode = () => {
  const { _id } = useParams();

  return (
    <Container fluid className="color2" id={PAGE_IDS.USER_QR_CODE}>
      <Container>
        <Row>
          <Col className="p-3">
            <h1>QR Code</h1>
            <p>Show this to the event organizer to log your hours.</p>
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          <QRCodeGenerator userID={_id} />
        </Row>
      </Container>
    </Container>
  );
};

export default UserQRCode;
