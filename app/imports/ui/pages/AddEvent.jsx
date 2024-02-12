import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/event/EventCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: { type: String, index: true },
  image: { type: String, optional: true },
  description: { type: String, optional: true, defaultValue: '' },
  location: { type: String, optional: true, defaultValue: '' },
  time: {
    type: Date,
    defaultValue: new Date(),
    optional: true,
  },
  frequency: { type: String, optional: true, defaultValue: 'Once' },
  accessibilities: { type: Array, unique: true, optional: true, defaultValue: [] },
  'accessibilities.$': { type: String },
  requiredSkills: { type: Array, optional: true, defaultValue: [] },
  'requiredSkills.$': { type: String },
  requirements: { type: Array, unique: true, optional: true, defaultValue: [] },
  'requirements.$': { type: String },
  impact: { type: String, optional: true, defaultValue: '' },
  hostType: { type: String, allowedValues: ['individual', 'organization', 'school', 'community'], optional: true, defaultValue: 'individual' },
  hostBy: { type: String, defaultValue: '' }, // organization/individual name
  hostID: { type: String, defaultValue: '' }, // organization/individual ID
  phone: { type: String, optional: true, defaultValue: '' },
  activityType: { type: String, allowedValues: ['remote', 'in-person', 'hybrid'], optional: true, defaultValue: 'in-person' },
  activityCategory: { type: String, optional: true, defaultValue: 'general' },
  address: { type: String, optional: true, defaultValue: '' },
  zipCode: { type: String, optional: true, defaultValue: '' },
  city: { type: String, optional: true, defaultValue: '' },
  state: { type: String, optional: true, defaultValue: '' },
  country: { type: String, optional: true, defaultValue: '' },
  totalSpots: { type: Number, optional: true, defaultValue: 1 },
  spotsFilled: { type: Array, optional: true, defaultValue: [] },
  'spotsFilled.$': { type: String },
  canceledVolunteer: { type: Array, optional: true, defaultValue: [] },
  'canceledVolunteer.$': { type: String },
  eventState: { type: String, allowedValues: ['ended', 'onGoing', 'canceled'], optional: true, defaultValue: 'onGoing' },
  recruiting: { type: Boolean, optional: true, defaultValue: true },
  equipments: { type: Object, optional: true },
  'equipments.key': { type: String },
  'equipments.value': { type: Array },
  'equipments.value.$': { type: String },
  equipmentsCount: { type: Object, optional: true },
  'equipmentsCount.key': { type: String }, // name of the equipment
  'equipmentsCount.value': { type: Object }, // a dictionary of different specification for each equipment
  'equipmentsCount.value.key': { type: String }, // name of the specificaiton
  'equipmentsCount.value.value': { type: Number }, // total numbers
  startTime: { type: Date, optional: true, defaultValue: new Date() },
  endTime: { type: Date, optional: true, defaultValue: new Date() },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddEvent page for adding a document. */
const AddEvent = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, description, location, startTime, endTime } = data;
    const owner = Meteor.user().username;
    Events.collection.insert(
      { title, description, location, startTime, endTime, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Event</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="title" />
                <TextField name="description" />
                <TextField name="location" />
                <DateField name="startTime" />
                <DateField name="endTime" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEvent;
