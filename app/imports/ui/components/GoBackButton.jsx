import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const GoBackButton = () => {
  const history = useNavigate();
  return (
    <Button className="commit-btn" onClick={() => history(-1)}>Back
    </Button>
  );
};

export default GoBackButton;
