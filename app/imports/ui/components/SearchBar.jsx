import React, { useState } from 'react';
import { Dropdown, Form, Card, Row, Col, Container } from 'react-bootstrap'; // Import Col from react-bootstrap
import Fuse from 'fuse.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';
import CommitToEvent from './CommitToEvent';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { ready, events } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const items = Events.find({}).fetch();
    return {
      events: items,
      ready: rdy,
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (ready) {
    const fuseOptions = {
      isCaseSensitive: false,
      shouldSort: true,
      includeMatches: true,
      findAllMatches: true,
      useExtendedSearch: false,
      keys: ['title'],
    };

    if (events && events.length > 0) {
      const fuse = new Fuse(events, fuseOptions);
      const result = fuse.search(searchQuery);

      return (
        <Container>
          <Form.Group controlId="formEventSearch" className="d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Search for events..."
              style={{ width: '500px' }}
              className="mr-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {/* Filter Dropdowns */}
            <Dropdown className="px-2">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Distance
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">5 miles</Dropdown.Item>
                <Dropdown.Item href="#/action-2">10 miles</Dropdown.Item>
                <Dropdown.Item href="#/action-3">20 miles</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Row className="p-3">
            {result.map((item) => (
              <Col key={item.item._id} md={4} className="py-2">
                <Card style={{ maxHeight: '400px' }}>
                  <Card.Body>
                    <Card.Img variant="top" src={item.item.image} />
                    <Card.Title>{item.item.title}</Card.Title>
                    <Card.Text style={{ height: '150px', overflow: 'auto' }}>{item.item.description}</Card.Text>
                    <Row className="py-1">
                      <Col>
                        Location:
                        <Card.Text>{item.item.location}</Card.Text>
                      </Col>
                      <Col>
                        Date:
                        <Card.Text>{item.item.time.date}</Card.Text>
                      </Col>
                    </Row>
                    Required Skills:
                    <Card.Text>{item.item.requirements}</Card.Text>
                    <CommitToEvent event={item.item} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

        </Container>
      );
    }

    return <p>No events found</p>;
  }

  return <LoadingSpinner />;
};

export default SearchBar;
