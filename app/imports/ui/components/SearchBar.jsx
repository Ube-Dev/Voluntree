import React, { useState } from 'react';
import { Form, Card, Row, Col, Container, Pagination } from 'react-bootstrap';
import Fuse from 'fuse.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';
import CommitToEvent from './CommitToEvent';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

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
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  if (ready) {
    const fuseOptions = {
      isCaseSensitive: false,
      shouldSort: true,
      includeMatches: true,
      findAllMatches: true,
      useExtendedSearch: false,
      keys: ['title', 'organization', 'description', 'location', 'requirements'],
    };

    if (events && events.length > 0) {
      const fuse = new Fuse(events, fuseOptions);
      const result = fuse.search(searchQuery);

      const indexOfLastEvent = currentPage * eventsPerPage;
      const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
      const currentEvents = result.slice(indexOfFirstEvent, indexOfLastEvent);

      const paginate = (pageNumber) => setCurrentPage(pageNumber);

      return (
        <Container>
          <Form.Group controlId="formEventSearch">
            <Form.Control
              type="text"
              placeholder="Search for events..."
              style={{ width: '500px' }}
              className="mr-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
          <Row className="p-3">
            {currentEvents.map((item) => (
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
          {/* Pagination buttons */}
          <Container>
            <Pagination>
              <Pagination.First onClick={() => paginate(1)} />
              <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
              {Array.from({ length: Math.ceil(result.length / eventsPerPage) }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => paginate(currentPage + 1)} />
              <Pagination.Last onClick={() => paginate(Math.ceil(result.length / eventsPerPage))} />
            </Pagination>
          </Container>
        </Container>
      );
    }

    return <p>No events found</p>;
  }

  return <LoadingSpinner />;
};

export default SearchBar;
