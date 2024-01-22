/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Card, Button, ButtonGroup, Row, Col } from 'react-bootstrap';

import EventCard from '../components/EventCard';
import '../css/AllEventPage.css';
// samples for display purposes.
const events = {
  1: {
    key: 1,
    img: '/images/meteor-logo.png',
    title: 'event',
    description: 'this is a description',
    date: '01-16-24',
    requiredSkills: ['skill1', 'skill2', 'skill3'],
  },
  2: {
    key: 2,
    img: '/images/meteor-logo.png',
    title: 'event',
    description: 'this is a description',
    date: '01-16-24',
    requiredSkills: ['skill1', 'skill2', 'skill3'],
  },
  3: {
    key: 3,
    img: '/images/meteor-logo.png',
    title: 'long event',
    // eslint-disable-next-line max-len
    description: 'this is a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooon description',
    date: '01-16-24',
    // eslint-disable-next-line max-len
    requiredSkills: ['skill1', 'skill2', 'skill3', 'skill1', 'skill2', 'skill3', 'skill1', 'skill2', 'skill3'],
  },
  4: {
    key: 4,
    img: '/images/meteor-logo.png',
    title: 'event',
    description: 'this is a description',
    date: '01-16-24',
    requiredSkills: ['skill1', 'skill2', 'skill3'],
  },
};

const AllEventPage = () => {
  // apply filter to the entire page when a specific skill is clicked.
  // buttons inside <EventCard> will invoke this function.
  const filterSkill = (skill) => {
    // console.log('triggered');
  };
  return (
    // <searchFilter> here
    <Container>
      <Row className="g-2">
        {Object.values(events).map((event) => (
          <Col className="w-25 h-25 xl-3 md-4 sm-6">
            <Card key={event.key} className="">
              <Card.Img variant="top" src={event.img} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text className="description">
                  {event.description}
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <ButtonGroup className="flex-wrap-buttons">
                  {event.requiredSkills.map((skill) => (
                    <Button className="skill-button" onClick={() => filterSkill(skill)}>
                      {skill}
                    </Button>
                  ))}
                </ButtonGroup>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{event.date}</small>
              </Card.Footer>
            </Card>
          </Col>

        ))}
      </Row>
    </Container>
  );
};

export default AllEventPage;
