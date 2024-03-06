import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const GoBackButton = () => {
  const history = useNavigate();
  return (
    <Button style={{ backgroundColor: 'gold', color: 'black', border: 'none' }} onClick={() => history(-1)}>Back
    </Button>
  );
};

export default GoBackButton;
