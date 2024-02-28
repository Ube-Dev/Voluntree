// needs restyling
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Container } from 'react-bootstrap';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const [verificationError, setVerificationError] = useState(null);

  useEffect(() => {
    // verify email
    Accounts.verifyEmail(token, (error) => {
      if (error) {
        setVerificationError(error.reason || "Verification failed.");
      } else {
        console.log('verified');
      }
    });
  }, [token, history]);

  return (
    <Container>
      {verificationError ? (
        <p>Error verifying email: {verificationError}</p>
      ) : (
        <p>Verified</p>
      )}
    </Container>
  );
}; 

export default VerifyEmailPage;
