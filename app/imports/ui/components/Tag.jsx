import React from 'react';
import { Button } from 'react-bootstrap';
import '../css/EventCard.css';

const Tag = ({ value }) => (
  <Button>
    {value}
  </Button>
);

Tag.propTypes = {
  value: String,
}.isRequired;

export default Tag;
