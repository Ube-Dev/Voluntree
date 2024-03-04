import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const GoBackButton = () => {
  const history = useNavigate();
  return (
    <Button className="px-1" style={{ color: 'black' }} onClick={() => history(-1)}>Back
    </Button>
  );
};

export default GoBackButton;
