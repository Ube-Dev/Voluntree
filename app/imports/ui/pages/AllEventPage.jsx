/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, Card, Button, ButtonGroup, Row, Col, Pagination } from 'react-bootstrap';
import { TagFill } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import SearchBar from '../components/SearchBar';
import '../css/AllEventPage.css';
import CommitToEvent from '../components/CommitToEvent';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Events } from '../../api/event/EventCollection';

const AllEventPage = () => {
  // apply filter to the entire page when a specific skill is clicked.
  // buttons inside <EventCard> will invoke this function.
  const filterSkill = (skill) => {
    // console.log('triggered');
  };

  const { ready, events } = useTracker(() => {
  // Get access to events
    const subscription = Events.subscribeEvent();
    // Make sure its ready
    const rdy = subscription.ready();
    // fetch all events
    const theEvents = Events.find({}).fetch();
    return {
      events: theEvents,
      ready: rdy,
    };
  }, []);
  return (
    <Container id={PAGE_IDS.EVENTS}>
      <SearchBar />
    </Container>
  );
  //     <Container>
  //       <Row className="g-2">
  //         {Object.values(sample_data.events).map((event) => (
  //           <Col className="w-25 h-25 xl-3 md-4 sm-6">
  //             <Card key={event.key} className="">
  //               <Card.Img variant="top" src={event.img} />
  //               <Card.Body>
  //                 <Card.Title>{event.title}</Card.Title>
  //                 <Card.Text className="description">
  //                   {event.description}
  //                 </Card.Text>
  //               </Card.Body>
  //               <Card.Body>
  //                 <ButtonGroup className="flex-wrap-buttons mx-2">
  //                   {event.requiredSkills.map((skill) => (
  //                     <Button type="button" className="bg-transparent text-primary border-0 skill-button" onClick={() => filterSkill(skill)}>
  //                       <TagFill />{skill}
  //                     </Button>
  //                   ))}
  //                 </ButtonGroup>
  //               </Card.Body>
  //               <Card.Footer>
  //                 <CommitToEvent />
  //                 <small className="text-muted">{event.date}</small>
  //               </Card.Footer>
  //             </Card>
  //           </Col>
  //
  //         ))}
  //       </Row>
  //     </Container>
  //     <Container className="d-flex justify-content-center mt-3">
  //       <Pagination>
  //         <Pagination.First />
  //         <Pagination.Prev />
  //         <Pagination.Item>{1}</Pagination.Item>
  //         <Pagination.Ellipsis />
  //
  //         <Pagination.Item>{10}</Pagination.Item>
  //         <Pagination.Item>{11}</Pagination.Item>
  //         <Pagination.Item active>{12}</Pagination.Item>
  //         <Pagination.Item>{13}</Pagination.Item>
  //         <Pagination.Item disabled>{14}</Pagination.Item>
  //
  //         <Pagination.Ellipsis />
  //         <Pagination.Item>{20}</Pagination.Item>
  //         <Pagination.Next />
  //         <Pagination.Last />
  //       </Pagination>
  //     </Container>
  // );
};

export default AllEventPage;
