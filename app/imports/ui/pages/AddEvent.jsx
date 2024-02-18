import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
// import { Events } from '../../api/event/EventCollection';
import { createEvent } from '../../startup/both/Methods';
// import { PAGE_IDS } from '../utilities/PageIDs';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: { type: String, optional: false },
  image: { type: String, optional: true },
  description: { type: String, optional: false },
  impact: { type: String, optional: false },
  address: { type: String, optional: false },
  zipCode: { type: String, optional: false },
  city: { type: String, optional: false },
  state: { type: String, optional: false },
  country: { type: String, optional: false },
  totalSpots: { type: SimpleSchema.Integer, optional: false },
  startTime: { type: Date, optional: false },
  endTime: { type: Date, optional: false },
  frequency: {
    type: String,
    allowedValues: ['Once', 'Daily', 'Weekly', 'Monthly', 'Yearly'],
    defaultValue: 'Once',
    optional: false,
  },
  accessibilities: {
    type: Array,
    optional: false,
    defaultValue: [],
  },
  'accessibilities.$': {
    type: String,
    allowedValues: ['Wheelchair', 'Elevator', 'Ramp', 'Braille', 'SignLanguage', 'Quiet'],
  },
  requiredSkills: {
    type: Array,
    optional: false,
    defaultValue: [],
  },
  'requiredSkills.$': {
    type: String,
    allowedValues: ['Cooking', 'Cleaning', 'Teaching', 'Music', 'Art', 'Gardening', 'Construction', 'Computer'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddEvent page for adding a document. */
const AddEvent = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, image, description, impact, address, zipCode, city, state, country, totalSpots, startTime, endTime, accessibilities, requiredSkills } = data;
    const owner = Meteor.user().username;
    const definitionData = { title, image, description, impact, address, zipCode, city, state, country, totalSpots, startTime, endTime, accessibilities, requiredSkills, owner };
    Meteor.call(createEvent, definitionData, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', `Successfully added ${title}`, 'success')));
    formRef.reset();
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container fluid className="color2">
      <Container className="mb-5 mt-3">
        <Row className="justify-content-center">
          <Col xs={8}>
            <Row className="text-center">
              <h1>Create Event</h1>
            </Row>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card className="rounded-4">
                <Card.Header className="color1">Event Details</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <TextField name="title" />
                    </Col>
                    <Col>
                      <TextField name="image" />
                    </Col>
                    <LongTextField name="description" placeholder="What's happening?" />
                    <LongTextField name="impact" placeholder="How will this help?" />
                    <NumField name="totalSpots" placeholder="0" />
                  </Row>
                </Card.Body>
              </Card>
              <Card className="rounded-4 mt-2">
                <Card.Header>Location</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <TextField name="address" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField name="zipCode" />
                    </Col>
                    <Col>
                      <TextField name="city" />
                    </Col>
                    <Col>
                      <TextField name="state" />
                    </Col>
                    <Col>
                      <TextField name="country" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="rounded-4 mt-2">
                <Card.Header>Time of Event</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <DateField name="startTime" />
                      <DateField name="endTime" />
                    </Col>
                    <Col>
                      <SelectField name="frequency" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="rounded-4 mt-2">
                <Card.Header>Required Skills & Accessibilitys</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <SelectField name="requiredSkills" />
                    </Col>
                    <Col>
                      <SelectField name="accessibilities" />
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <SubmitField />
                  <ErrorsField />
                </Card.Footer>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AddEvent;
