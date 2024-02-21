import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

const EventCardWithActions = ({ event }) => {
  const navigate = useNavigate();

  // Edit event functionality
  const handleEdit = () => {
    // Navigate to the event edit page
    navigate(`/edit_event/${event._id}`);
  };

  // Delete event functionality
  const handleDelete = () => {
    // Confirmation before deleting
    if (window.confirm('Are you sure you want to delete this event?')) {
      Meteor.call('Events.remove', event._id, (error) => {
        if (error) {
          console.error('Error deleting event:', error);
          alert('Error deleting event. Please try again.');
        } else {
          alert('Event successfully deleted.');
        }
      });
    }
  };

  return (
    <div>
      <EventCard event={event} />
      <div className="d-flex justify-content-between mt-2">
        <Button variant="primary" onClick={handleEdit}>Edit</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

EventCardWithActions.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCardWithActions;
