import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import EventList from './EventList';

const EventFilter = ({ event, categories }) => {
  const [categoryFilter, setCategoryFilter] = useState([]);
  const resetFilter = () => {
    setCategoryFilter([]);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (categoryFilter.includes(value)) {
      setCategoryFilter(categoryFilter.filter((filter) => filter !== value));
    } else {
      setCategoryFilter([...categoryFilter, value]);
    }
  };
  const isCategoryChecked = (category) => categoryFilter.includes(category);

  const filteredProducts = categoryFilter.length > 0 ?
    event.filter((theEvent) => categoryFilter.includes(theEvent.title)) :
    event;

  return (
    <Container>
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic"> Filter by Category </Dropdown.Toggle>
            <Dropdown.Menu>
              <Form>
                {event.map((theEvent, index) => (
                  <div className="d-flex mx-3 my-2" key={index}>
                    <Form.Check
                      type="checkbox"
                      value={theEvent.title}
                      onChange={handleCheckboxChange}
                      checked={isCategoryChecked(theEvent.title)}
                    />
                    <div className="ms-2">
                      {theEvent.title}
                    </div>
                  </div>
                ))}
                <Button variant="link" className="ms-auto" onClick={resetFilter}>reset</Button>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="col-10">
          <EventList theEvents={filteredProducts} />
        </Col>
      </Row>
    </Container>
  );
};

EventFilter.propTypes = {
  event: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
    time: PropTypes.instanceOf(Date),
    totalSpots: PropTypes.number,
    spotsFilled: PropTypes.instanceOf(Array),
    frequency: PropTypes.string,
    accessibilities: PropTypes.instanceOf(Array),
    requirements: PropTypes.instanceOf(Array),
    impact: PropTypes.string,
    hostBy: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
  })).isRequired,
};

export default EventFilter;
