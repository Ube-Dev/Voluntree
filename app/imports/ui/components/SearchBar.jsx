import React, { useState } from 'react';
import { Form, Row, Col, Container, Pagination } from 'react-bootstrap';
import Fuse from 'fuse.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';
import EventCard from './EventCard';

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

      const totalPages = Math.ceil(result.length / eventsPerPage);

      const paginate = (pageNumber) => setCurrentPage(pageNumber);

      return (
        <Container>
          <Row className="justify-content-center text-center">
            <h1>Search Events</h1>
            <p>Total Results: {result.length}</p>
          </Row>
          <Container className="d-flex justify-content-center">
            <Form.Group controlId="formEventSearch">
              <Form.Control
                type="text"
                placeholder="Let's help...."
                style={{ maxWidth: '600px', minWidth: '275px' }}
                className="align-content-center"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Container>
          <Row className="p-3">
            {currentEvents.map((item) => (
              <Col key={item.item._id} md={4} className="py-2">
                <EventCard event={item.item} />
              </Col>
            ))}
          </Row>
          {/* Pagination buttons */}
          {totalPages > 1 && (
            <Container className="d-flex justify-content-center">
              <Pagination>
                <Pagination.First onClick={() => paginate(1)} />
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} />
                <Pagination.Last onClick={() => paginate(totalPages)} />
              </Pagination>
            </Container>
          )}
        </Container>
      );
    }

    return <p>No events found</p>;
  }

  return <LoadingSpinner />;
};

export default SearchBar;
