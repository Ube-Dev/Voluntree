import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card } from 'react-bootstrap';
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
    <span className="rbc-toolbar-label" style={{ fontSize: '30px', color: 'black' }}>
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
    <Card style={{ width: 'calc(100% - 20px)', height: 'calc(100% - 20px)', padding: '10px' }}>
      <div style={{ width: '100%', height: '100%', backgroundColor: 'white', color: 'black' }}>
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
          style={{ color: 'black', width: 'calc(100% - 20px)', height: 'calc(100% - 20px)', margin: '10px' }}
        />
      </div>
    </Card>
  );
};

export default UserCalendar;
