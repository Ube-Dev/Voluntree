import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Container, Pagination } from 'react-bootstrap';
import Fuse from 'fuse.js';
import EventCard from './EventCard';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/*
 * renders the searchBar, the events passed in, as well as the pagination for the page.
 * @param theEvents the events that needs to be rendered.
 */
const EventList = ({ theEvents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const eventsPerPage = 9;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setSearchPerformed(event.target.value); // Set searchPerformed to true if search query is not empty
  };

  let displayedEvents = theEvents; // Default to all events

  if (searchPerformed && theEvents.length > 0) {
    const fuseOptions = {
      isCaseSensitive: false,
      shouldSort: true,
      includeMatches: true,
      findAllMatches: true,
      useExtendedSearch: false,
      threshold: 0.2,
      keys: ['title', 'eventPlanner', 'description', 'location', 'requirements'],
    };

    const fuse = new Fuse(theEvents, fuseOptions);
    const result = fuse.search(searchQuery);
    displayedEvents = result.map((item) => item.item);
  } else {
    // If no search is performed, take the first eventsPerPage events
    displayedEvents = theEvents.slice(0, eventsPerPage);
  }

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = displayedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(displayedEvents.length / eventsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container>
      <Container className="d-flex justify-content-center">
        <Form.Group className="search-bar">
          <Form.Control
            id={COMPONENT_IDS.EVENTS_SEARCHBAR}
            type="text"
            placeholder="Let's help...."
            className="align-content-center"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Container>
      {searchPerformed ? (
        <Row className="justify-content-center text-center p-2 text-color">
          <h4>Total Results: {displayedEvents.length}</h4>
        </Row>
      ) : (
        <Row className="justify-content-center text-center p-2 text-color">
          <h4>Latest Events</h4>
        </Row>
      )}
      <Row className="py-1 event-list">
        {currentEvents.map((item) => (
          <Col key={item._id} md={4} className="py-2">
            <EventCard event={item} />
          </Col>
        ))}
      </Row>
      {/* PaginationTool buttons */}
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
};

EventList.propTypes = {
  theEvents: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    time: PropTypes.instanceOf(Date),
    frequency: PropTypes.string,
    accessibilities: PropTypes.instanceOf(Array),
    requirements: PropTypes.instanceOf(Array),
    impact: PropTypes.string,
    hostBy: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
};
export default EventList;
