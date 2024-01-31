import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localize = momentLocalizer(moment);

const Toolbar = ({ label, onNavigate, onView }) => (
  <div className="rbc-toolbar">
    <span className="rbc-btn-group">
      <button type="button" onClick={() => onNavigate('PREV')}>
        {'<'}
      </button>
      <button type="button" onClick={() => onNavigate('TODAY')}>
        Today
      </button>
      <button type="button" onClick={() => onNavigate('NEXT')}>
        {'>'}
      </button>
    </span>
    <span className="rbc-toolbar-label" style={{ fontSize: '30px' }}>
      {label}
    </span>
    <span className="rbc-btn-group">
      <button type="button" onClick={() => onView('month')}>
        Month
      </button>
      <button type="button" onClick={() => onView('day')}>
        Day
      </button>
    </span>
  </div>
);

Toolbar.propTypes = {
  label: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

const UserCalendar = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Add event');
    if (title) {
      const newEvent = { start, end, title };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div style={{ width: '800px', height: '500px' }}>
      <Calendar
        localizer={localize}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelect}
        components={{
          toolbar: Toolbar,
        }}
      />
    </div>
  );
};

export default UserCalendar;
