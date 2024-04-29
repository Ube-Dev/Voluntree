import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { PAGE_IDS } from '../utilities/PageIDs';
import GoBackButton from '../components/GoBackButton';

const UserQRCode = () => {
  const { _id } = useParams();

  return (
    <Container fluid className="color1" id={PAGE_IDS.USER_QR_CODE}>
      <Container>
        <Row className="py-2 mt-3 text-center">
          <h2>QR Code</h2>
          <hr />
          <h3>Show this to the event organizer to log your hours.</h3>
        </Row>
        <Row className="mt-5 mb-5 py-3">
          <QRCodeGenerator userID={_id} />
        </Row>
        <Row className="pb-5 justify-content-center">
          <Col className="col-3 text-center">
            <GoBackButton />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default UserQRCode;
