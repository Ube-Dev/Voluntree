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

    try {
      Events.define(newEvent);
      alert('Event added successfully!');
      this.setState({ title: '', description: '', location: '', startTime: '', endTime: '' });
      // Reset the form
      // Optionally, redirect to the events list page
    } catch (error) {
      console.error("Error adding event:", error);
      alert('Failed to add event. Please try again.');
    }
  }

  // Renders AddEvent page
  render() {
    return (
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Add New Event</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group mb-3">
                <label>Title:</label>
                <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
              </div>

              <div className="form-group mb-3">
                <label>Description:</label>
                <textarea className="form-control" name="description" value={this.state.description} onChange={this.handleChange} />
              </div>

              <div className="form-group mb-3">
                <label>Location:</label>
                <input className="form-control" type="text" name="location" value={this.state.location} onChange={this.handleChange} />
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group mb-3">
                    <label>Start Time:</label>
                    <input className="form-control" type="datetime-local" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group mb-3">
                    <label>End Time:</label>
                    <input className="form-control" type="datetime-local" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEvent;
