/* eslint-disable no-undef */
import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import '../css/EventCard.css';

// template from https://react-bootstrap.netlify.app/docs/components/cards/#card-groups
// eventId: event id in the db
// img: static string link
// title: string
// description: title
// date: string
// requriedSkill: [skill, skill, skill, ...]
const EventCard = ({ eventId, img, title, description, date, requiredSkills, filterSkill }) => {
  <Card key={eventId} className="w-25">
    <Card.Img variant="top" src={img} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        {description}
      </Card.Text>
    </Card.Body>
    <Card.Body>
      <ButtonGroup className="flex-wrap-buttons">
        {requiredSkills.map((skill) => (
          <Button className="mx-1 skill-button" onClick={() => filterSkill(skill)}>
            {skill}
          </Button>

        ))}
      </ButtonGroup>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{date}</small>
    </Card.Footer>
  </Card>;
};

export default EventCard;
