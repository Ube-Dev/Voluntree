import React, { Component } from 'react';
import { Events } from '/imports/api/event/EventCollection';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      location: '',
      startTime: '',
      endTime: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newEvent = {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      startTime: new Date(this.state.startTime),
      endTime: new Date(this.state.endTime)
    };

    // Call the EventCollection define method to insert a new event
    Events.define(newEvent);
    alert('Event added successfully!');
    // Reset the form or navigate to another page
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </label>

        <label>
          Description:
          <textarea name="description" value={this.state.description} onChange={this.handleChange} />
        </label>

        <label>
          Location:
          <input type="text" name="location" value={this.state.location} onChange={this.handleChange} />
        </label>

        <label>
          Start Time:
          <input type="datetime-local" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
        </label>

        <label>
          End Time:
          <input type="datetime-local" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddEvent;
