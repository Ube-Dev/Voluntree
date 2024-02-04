import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Calendar = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState({});

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getMonthData = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = getDaysInMonth(year, month);

    const data = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay.getDay()) || dayCounter > daysInMonth) {
          week.push(null);
        } else {
          week.push(new Date(year, month, dayCounter));
          dayCounter++;
        }
      }
      data.push(week);
    }
    return data;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEventChange = (event) => {
    const { value } = event.target;
    setEvents({
      ...events,
      [selectedDate.toDateString()]: value,
    });
  };

  const handleSaveEvent = () => {
    setShowModal(false);
  };

  const changeMonth = (offset) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + offset, 1));
  };

  const renderHeader = () => {
    const options = { month: 'long', year: 'numeric' };
    return (
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Button variant="link" onClick={() => changeMonth(-1)}>
          {'<'}
        </Button>
        <h2>{selectedDate.toLocaleDateString(undefined, options)}</h2>
        <Button variant="link" onClick={() => changeMonth(1)}>
          {'>'}
        </Button>
      </div>
    );
  };

  const renderDaysOfWeekHeader = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <thead>
        <tr>
          {daysOfWeek.map((day, index) => (
            <th style={{ fontSize: '20px', padding: '10px' }} key={index} className="text-center">{day}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderCalendarBody = () => {
    const monthData = getMonthData(selectedDate.getFullYear(), selectedDate.getMonth());
    return (
      <tbody>
        {monthData.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((day, dayIndex) => (
              <td
                key={dayIndex}
                role="gridcell"
                className={`${day ? 'cursor-pointer' : 'empty-day'}`}
                style={{ width: '110px', height: '80px' }}
                onClick={() => day && handleDateClick(day)}
              >
                {day && (
                  <div className="day-content">
                    <span className="day-number">{day.getDate()}</span>
                    {events[day.toDateString()] && (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleDateClick(day)}
                        onKeyDown={(e) => e.key === 'Enter' && handleDateClick(day)}
                      >
                        {events[day.toDateString()]}
                      </div>
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const renderModal = () => (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedDate.toLocaleDateString()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          placeholder="Add events..."
          value={events[selectedDate.toDateString()] || ''}
          onChange={handleEventChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveEvent}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div>
      {renderHeader()}
      <Table bordered size="lg">
        {renderDaysOfWeekHeader()}
        {renderCalendarBody()}
      </Table>
      {renderModal()}
    </div>
  );
};

export default Calendar;
