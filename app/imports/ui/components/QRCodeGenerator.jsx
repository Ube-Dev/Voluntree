import React, { useState, useEffect } from 'react';
import qrcode from 'qrcode';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const QRCodeGenerator = () => {
  const [qrCode, setQRCode] = useState('');
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [userQrText, setUserQrText] = useState('');
  const [qrCodeReady, setQRCodeReady] = useState(false);

  const getUserData = () => {
    const userId = Meteor.user();

    if (userId !== undefined && userId !== null) {
      setUserQrText(userId.emails[0].address);

      qrcode.toDataURL(userId.emails[0].address, (err, dataUrl) => {
        if (err) {
          console.error(err);
          setLoading(false);
        } else {
          setQRCode(dataUrl);
          setQRCodeReady(true);
          setLoading(false);
        }
      });
    } else {
      // Retry after a delay
      setTimeout(getUserData, 1000); // Adjust the delay as needed
    }
  };

  useEffect(() => {
    getUserData();
  }, []); // Empty dependency array to run once on mount

  return (
    <Container>
      <h1 className="text-center py-3">User QR Code</h1>

      <Container id="generate-qr" className="d-flex justify-content-center align-items-center">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Container id="qrcode" className="col-lg-4">
            {qrCodeReady && <img src={qrCode} alt="QR Code" width="100%" />}
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default QRCodeGenerator;
