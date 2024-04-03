import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import EventList from './EventList';

const EventFilter = ({ event, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const resetFilter = () => {
    setSelectedCategories([]);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((filter) => filter !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };
  const isCategoryChecked = (category) => selectedCategories.includes(category);

  const filteredEvents = selectedCategories.length > 0
    ? event.filter((theEvent) => selectedCategories.every((selectedCategory) => theEvent.activityCategory.mainCategory === selectedCategory))
    : event;

  return (
    <Container>
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic"> Filter by Category </Dropdown.Toggle>
            <Dropdown.Menu>
              <Form>
                {categories.map((theCategory, index) => (
                  <div className="d-flex mx-3 my-2" key={index}>
                    <Form.Check
                      type="checkbox"
                      value={theCategory.category}
                      onChange={handleCheckboxChange}
                      checked={isCategoryChecked(theCategory.category)}
                    />
                    <div className="ms-2">
                      {theCategory.category}
                    </div>
                  </div>
                ))}
                <Button variant="link" className="ms-auto" onClick={resetFilter}>reset</Button>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="col-10">
          <EventList theEvents={filteredEvents} />
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