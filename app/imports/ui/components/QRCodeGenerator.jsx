import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qrcode from 'qrcode';
import { Container, Image } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import '../css/UserQRCode.css';

const QRCodeGenerator = ({ userID }) => {
  const [qrCode, setQRCode] = useState('');
  const [qrCodeReady, setQRCodeReady] = useState(false);

  useEffect(() => {
    if (userID) {
      // Generate QR code with userID
      qrcode.toDataURL(userID, (err, dataUrl) => {
        setQRCode(dataUrl);
        setQRCodeReady(true);
      });
    }
  }, [userID]);

  // Returns QR code image
  return qrCodeReady ? (
    <Container className="d-flex justify-content-center">
      <Image src={qrCode} alt="User QR Code" className="qr-code" />
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

QRCodeGenerator.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default QRCodeGenerator;
