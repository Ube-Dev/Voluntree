import React, { useState } from 'react';
import { Card, Col, Container, Row, Button, Modal } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Navigate, useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { removeEvent, updateEvent } from '../../startup/both/Methods';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { MainCategory } from '../../api/category/MainCategoryCollection';
import { SubCategory } from '../../api/category/SubCategoryCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: { type: String, optional: false },
  image: { type: String, optional: true },
  description: { type: String, optional: false },
  impact: { type: String, optional: false },
  activityType: { type: String, allowedValues: ['remote', 'in-person', 'hybrid'], defaultValue: 'in-person', optional: false },
  activityCategory: {
    type: Object,
    optional: false,
    defaultValue: [],
  },
  'activityCategory.mainCategory': {
    type: String,
    optional: false,
  },
  'activityCategory.subCategory': {
    type: String,
    optional: false,
  },
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

const EditEvent = () => {
  const { _id } = useParams();
  const { ready, events, categories, subCategories } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const subscription2 = MainCategory.subscribeMainCategory(); // Subscribe to the main category publication
    const subscription3 = SubCategory.subscribeSubCategory(); // Subscribe to the sub category publication
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const theEvents = Events.findOne(_id);
    const mainCategory = MainCategory.find({}).fetch(); // Query main category
    const subCategoryData = SubCategory.find({}).fetch(); // Query sub category
    return {
      events: theEvents,
      categories: mainCategory.map(category => category.category),
      subCategories: subCategoryData.map(subCategory => subCategory.category),
      ready: rdy,
    };
  }, []);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const toggleDeleteConfirmation = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  const confirmDelete = () => {
    Meteor.call(removeEvent, _id, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event deleted successfully', 'success');
        setShowDeleteConfirmation(false);
        setRedirectToRef(true);
      }
    });
  };

  if (redirectToReferer) {
    return <Navigate to="/Dashboard" />;
  }

  const submit = (data) => {
    const { title, image, description, impact, totalSpots, activityType, activityCategory, address, zipCode, city, state, country, startTime, endTime, accessibilities, requiredSkills } = data;
    const definitionData = { title, image, description, impact, totalSpots, activityType, activityCategory, address, zipCode, city, state, country, startTime, endTime, accessibilities, requiredSkills };
    Meteor.call(updateEvent, _id, definitionData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', `Successfully added ${title}`, 'success');
      }
    });
  };

  return ready ? (
    <Container fluid className="color2" id={PAGE_IDS.EDIT_EVENT}>
      <Container className="mb-5 mt-3">
        <Row className="justify-content-center">
          <Col md={8} xs={12}>
            <Row className="text-center">
              <h1>Edit Event</h1>
            </Row>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={events}>
              <Card className="rounded-4">
                <Card.Header className="section-header">Event Details</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <TextField name="title" id={COMPONENT_IDS.ADD_EVENT_FORM_TITLE} />
                    </Col>
                    <Col>
                      <TextField name="image" id={COMPONENT_IDS.ADD_EVENT_FORM_IMAGE} />
                    </Col>
                  </Row>
                  <LongTextField name="description" placeholder="What's happening?" id={COMPONENT_IDS.ADD_EVENT_FORM_DESCRIPTION} />
                  <LongTextField name="impact" placeholder="How will this help?" id={COMPONENT_IDS.ADD_EVENT_FORM_IMPACT} />
                  <Row>
                    <Col>
                      <NumField name="totalSpots" placeholder="0" id={COMPONENT_IDS.ADD_EVENT_FORM_TOTAL_SPOTS} />
                    </Col>
                    <Col>
                      <SelectField name="activityType" id={COMPONENT_IDS.ADD_EVENT_FORM_ACTIVITY_TYPE} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="rounded-4 mt-3">
                <Card.Header className="section-header">Location</Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <TextField name="address" id={COMPONENT_IDS.ADD_EVENT_FORM_ADDRESS} />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <TextField name="zipCode" id={COMPONENT_IDS.ADD_EVENT_FORM_ZIPCODE} />
                    </Col>
                    <Col md={3}>
                      <TextField name="city" id={COMPONENT_IDS.ADD_EVENT_FORM_CITY} />
                    </Col>
                    <Col md={3}>
                      <TextField name="state" id={COMPONENT_IDS.ADD_EVENT_FORM_STATE} />
                    </Col>
                    <Col md={3}>
                      <TextField name="country" id={COMPONENT_IDS.ADD_EVENT_FORM_COUNTRY} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="rounded-4 mt-3">
                <Card.Header className="section-header">Time of Event</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <DateField name="startTime" id={COMPONENT_IDS.ADD_EVENT_FORM_START_DATE} />
                      <DateField name="endTime" id={COMPONENT_IDS.ADD_EVENT_FORM_END_DATE} />
                    </Col>
                    <Col>
                      <SelectField name="frequency" id={COMPONENT_IDS.ADD_EVENT_FORM_FREQUENCY} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="rounded-4 mt-3">
                <Card.Header className="section-header">Required Skills & Accessibilities</Card.Header>
                <Card.Body>
                  <Row className="justify-content-center">
                    <Col md={4} lg={4}>
                      <SelectField name="requiredSkills" id={COMPONENT_IDS.ADD_EVENT_FORM_REQUIRED_SKILLS} />
                    </Col>
                    <Col md={4} lg={4}>
                      <SelectField name="accessibilities" id={COMPONENT_IDS.ADD_EVENT_FORM_ACCESSIBILITIES} />
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col>
                      <SubmitField id={COMPONENT_IDS.ADD_EVENT_FORM_SUBMIT} />
                      <ErrorsField />
                    </Col>
                    <Col className="text-end">
                      <Button variant="danger" onClick={toggleDeleteConfirmation}>
                        Delete Event
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </AutoForm>
            <Modal show={showDeleteConfirmation} onHide={toggleDeleteConfirmation}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this event?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleDeleteConfirmation}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  Confirm Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default EditEvent;
