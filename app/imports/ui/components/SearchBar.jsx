import React, { useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import Fuse from 'fuse.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';

const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const { ready, events } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Event documents.
    const subscription = Events.subscribeEvent();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the event documents
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
        <div>
          <Form.Group controlId="formEventSearch" className="d-flex align-items-center">
            <Form.Control type="text" placeholder="Search for events..." style={{ width: '500px' }} className="mr-2" value={searchQuery} onChange={handleSearchChange} />
            {/* Filter Dropdowns */}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Select Distance
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">5 miles</Dropdown.Item>
                <Dropdown.Item href="#/action-2">10 miles</Dropdown.Item>
                <Dropdown.Item href="#/action-3">20 miles</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Select Organization
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Organization 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Organization 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Organization 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="secondary" type="submit" className="ml-2">
              Search
            </Button>
          </Form.Group>
          <ul>
            {result.map((item) => (
              <li key={item.item._id}>
                <p>{item.item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    // Handle the case when the collection is empty
    return (
      <p>No events found</p>
    );
  }

  return (
    <LoadingSpinner />
  );
};

export default SearchBar;
