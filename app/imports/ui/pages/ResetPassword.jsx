// needs restyling
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Container } from 'react-bootstrap';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSucess] = useState(false);

  useEffect(() => {
    // Verify token validity here
    // Accounts.verifyEmail(token, (error) => {
    //   if (error) {
    //     setError('Invalid or expired token');
    //   }
    // });
  }, [token]);

  const handleResetPassword = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    Accounts.resetPassword(token, password, (error) => {
      if (error) {
        setError(error.reason || 'Password reset failed');
      } else {
        setSucess(true);
        return redirect('/signin');
      }
    });
  };

  return (
    <Container>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <Container>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Container>
        <Container>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Container>
        {success ? (
          <div style={{ color: 'green' }}>Success!</div>
          
        ) : (
          <div style={{ color: 'red' }}>{error}</div>
          )}
        <button type="submit">Reset Password</button>
      </form>
    </Container>
  );
};

export default ResetPasswordPage;
