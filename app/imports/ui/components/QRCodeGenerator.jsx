import React, { useState, useEffect } from 'react';
import qrcode from 'qrcode';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const QRCodeGenerator = () => {
  const [qrCode, setQRCode] = useState('');
  const [qrCodeReady, setQRCodeReady] = useState(false);

  useEffect(() => {
    const getUserData = () => {
      const userId = Meteor.userId();
      if (userId) {
        qrcode.toDataURL(userId, (err, dataUrl) => {
          if (err) {
            console.error(err);
            setQRCodeReady(false);
          } else {
            setQRCode(dataUrl);
            setQRCodeReady(true);
          }
        });
      }
    };

    getUserData();
  }, []);

  return (
    <Container>
      <h1 className="text-center py-3">User QR Code</h1>
      <Container id="generate-qr" className="d-flex justify-content-center align-items-center">
        {!qrCodeReady ? (
          <LoadingSpinner />
        ) : (
          <Container id="qrcode" className="col-lg-4">
            {qrCodeReady && <img src={qrCode} alt="User QR Code" width="100%" />}
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default QRCodeGenerator;
