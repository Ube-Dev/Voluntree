import React, { useState } from 'react';
import { Button, Card, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { createEvent } from '../../startup/both/Methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Organization } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: { type: String, optional: false },
  image: { type: String, optional: true },
  description: { type: String, optional: false },
  impact: { type: String, optional: false },
  activityType: { type: String, allowedValues: ['remote', 'in-person', 'hybrid'], defaultValue: 'in-person', optional: false },
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
  // Subscribe to the organization publication for the current user
  const { ready, organization } = useTracker(() => {
    const currentUser = Meteor.user()?._id; // Retrieve the current user
    const subscription = Organization.subscribeOrganization(); // Subscribe to organization publication for the current user
    const profile = Organization.find({ leader: currentUser }).fetch(); // Query user profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      organization: profile,
    };
  });

  const [numSections, setNumSections] = useState(0);

  const handleBack = () => {
    setNumSections(numSections - 1);
  };

  const handleNext = () => {
    setNumSections(numSections + 1);
  };
  const [selectedOrganization, setSelectedOrganization] = useState(0);

  const handleOrganizationSelect = (org) => {
    setSelectedOrganization(org);
  };

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, image, description, impact, totalSpots, activityType, address, zipCode, city, state, country, startTime, endTime, accessibilities, requiredSkills } = data;
    const hostBy = selectedOrganization?.name;
    const hostType = selectedOrganization?.type;
    const phone = selectedOrganization?.phone;
    const definitionData = { title, image, description, impact, totalSpots, activityType, hostBy, hostType, phone, address, zipCode, city, state, country, startTime, endTime, accessibilities, requiredSkills };
    Meteor.call(createEvent, definitionData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', `Successfully added ${title}`, 'success');
        formRef.reset();
      }
      // Clear the selected organization after submission or error
      setSelectedOrganization(null);
    });
  };

  let form = null;
  switch (numSections) {
  case 0:
    form = (
      <>
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
      </>
    );
    break;
  case 1:
    form = (
      <>
        <Card.Header className="section-header">Host Details</Card.Header>
        <Card.Body>
          <Row>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                My Organizations
              </Dropdown.Toggle>
              <Dropdown.Menu>{organization.map((org) => <Dropdown.Item key={org._id} onClick={() => handleOrganizationSelect(org)}>{org.name}</Dropdown.Item>)}</Dropdown.Menu>
            </Dropdown>
          </Row>
          <hr />
          <Row>
            <h4>Organization:</h4>
            <h5>{selectedOrganization ? selectedOrganization.name : <br />}</h5>
          </Row>
          <Row>
            <Col>
              <h4>Organization Type:</h4>
              <h5>{selectedOrganization ? selectedOrganization.type : <br />}</h5>
            </Col>
            <Col>
              <h4>Contact Information:</h4>
              <h5>{selectedOrganization ? selectedOrganization.phone : <br />}</h5>
            </Col>
          </Row>
        </Card.Body>
      </>
    );
    break;
  case 2:
    form = (
      <>
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
      </>
    );
    break;
  case 3:
    form = (
      <>
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
      </>
    );
    break;
  case 4:
    form = (
      <>
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
      </>
    );
    break;
  default:
    form = <LoadingSpinner />;
    break;
  }

  return (
    ready ? (
      <Container fluid className="color2" id={PAGE_IDS.ADD_EVENT}>
        <Container className="mb-5 mt-3">
          <Row className="justify-content-center">
            <Col md={8} xs={12}>
              <AutoForm schema={bridge} onSubmit={submit}>
                <Card className="rounded-4">
                  <form>{form}</form>
                  <Card.Footer>
                    <Row>
                      <Col>
                        {numSections !== 0 ? (
                          <Button className="commit-btn align-content-start" onClick={handleBack}>Back</Button>
                        ) : (null)}
                      </Col>
                      <Col className="justify-content-end align-content-end">
                        {numSections !== 4 ? (
                          <Button className="commit-btn" onClick={handleNext}>Next</Button>
                        ) : (null)}
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </AutoForm>
            </Col>
          </Row>
        </Container>
      </Container>
    ) : (
      <Container className="p-2">
        <LoadingSpinner /> {/* Show loading spinner while data is loading */}
      </Container>
    )
  );
};

export default AddEvent;
