import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { Events, eventPublications } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localize = momentLocalizer(moment);

// Custom toolbar component
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
  const { ready, userProfile } = useTracker(() => {
    const currentUser = Meteor.user();
    const userProfileSubscription = currentUser ? UserProfiles.subscribeUser() : null;
    const userProfileData = currentUser ? UserProfiles.findOne({ userID: currentUser._id }) : null;
    const eventSubscription = Meteor.subscribe(eventPublications.event);
    return {
      ready: userProfileSubscription ? userProfileSubscription.ready() && eventSubscription.ready() : false,
      userProfile: userProfileData,
    };
  });

  if (!ready) return <LoadingSpinner />;

  // Get committed events
  const getCommittedEvents = () => {
    const committedEvents = userProfile && userProfile.onGoingEvents ? userProfile.onGoingEvents : [];
    const eventsData = committedEvents.map(eventId => Events.findOne({ _id: eventId }));
    return eventsData.filter(event => event);
  };

  // Handle event click
  const handleEventSelect = event => {
    window.location.href = `/view_event/${event._id}`;
  };

  return (
    <Card style={{ width: 'calc(100% - 20px)', height: 'calc(100% - 20px)', padding: '10px' }}>
      <div style={{ width: '100%', height: '100%', backgroundColor: 'white', color: 'black' }}>
        <Calendar
          localizer={localize}
          events={getCommittedEvents()}
          startAccessor="startTime"
          endAccessor="endTime"
          selectable
          onSelectEvent={handleEventSelect}
          components={{ toolbar: Toolbar }}
          eventPropGetter={() => ({ style: { backgroundColor: '#03A696' } })}
          style={{ color: 'black', width: 'calc(100% - 20px)', height: 'calc(100% - 20px)', margin: '10px' }}
        />
      </div>
    </Card>
  );
};

export default UserCalendar;
