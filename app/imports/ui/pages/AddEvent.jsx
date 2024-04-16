import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Dropdown, Row, Button } from 'react-bootstrap';
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
  activityCategory: { type: String, optional: true },
  address: { type: String, optional: true },
  zipCode: { type: String, optional: true },
  city: { type: String, optional: true },
  state: { type: String, optional: true },
  country: { type: String, optional: true },
  totalSpots: { type: SimpleSchema.Integer, optional: false },
  startTime: { type: Date, optional: false },
  endTime: { type: Date, optional: false },
  showLocationForm: { type: Boolean, optional: false },
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
  const navigate = useNavigate();
  const sections = ['Event Details', 'Host Details', 'Location', 'Time of Event', 'Required Skills & Accessibilities'];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  // Subscribe to the organization publication for the current user
  const { ready, organization } = useTracker(() => {
    const currentUser = Meteor.user()._id; // Retrieve the current user
    const subscription = Organization.subscribeOrganization(); // Subscribe to organization publication for the current user
    const profile = Organization.find({ leader: currentUser }).fetch(); // Query user profile for the current user
    return {
      ready: subscription ? subscription.ready() : false,
      organization: profile,
    };
  });

  const handleOrganizationSelect = (org) => {
    setSelectedOrganization(org);
  };

  const renderMenuItems = () => organization.map((org, index) => (
    <Dropdown.Item key={index} onClick={() => handleOrganizationSelect(org)}>
      {org.name}
    </Dropdown.Item>
  ));

  // On submit, insert the data.
  const submit = async (data, formRef) => {
    try {
      const { title, image, description, impact, totalSpots, activityType, address, zipCode, city, state, country, startTime, endTime, accessibilities, requiredSkills } = data;
      const hostBy = selectedOrganization.name;
      const hostType = selectedOrganization ? 'organization' : 'individual';
      const hostID = selectedOrganization ? selectedOrganization._id : Meteor.userId();
      const phone = selectedOrganization.phone;
      const definitionData = { title, image, description, impact, totalSpots, activityType, hostBy, hostType, hostID, phone, address, zipCode, city, state, country, startTime, endTime, accessibilities, requiredSkills };

      const newEventId = await new Promise((resolve, reject) => {
        Meteor.call(createEvent, definitionData, (error, eventId) => {
          if (error) {
            reject(error);
          } else {
            resolve(eventId);
          }
        });
      });

      swal('Success', `Successfully added ${title}`, 'success');
      formRef.reset();
      navigate(`/view_event/${newEventId}`);
      setSelectedOrganization(null);
      setShowLocationForm(false);
    } catch (error) {
      swal('Error', error.message, 'error');
    }
  };

  // Function to handle going to next section
  const goToNextSection = () => {
    if (currentSectionIndex === 1 && !showLocationForm) {
      setCurrentSectionIndex(3);
      return;
    }
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  // Function to handle going to previous section
  const goToPreviousSection = () => {
    if (currentSectionIndex === 3 && !showLocationForm) {
      setCurrentSectionIndex(1);
      return;
    }
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    ready ? (
      <Container fluid className="color2" id={PAGE_IDS.ADD_EVENT}>
        <Container className="mb-5 mt-3">
          <Row className="justify-content-center">
            <Col md={8} xs={12}>
              <Row className="text-center">
                <h1>Create Event</h1>
              </Row>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
                {sections.map((section, index) => (
                  <Card key={index} className="rounded-4" style={{ display: currentSectionIndex === index ? 'block' : 'none' }}>
                    <Card.Header className="section-header">{section}</Card.Header>
                    <Card.Body>
                      {section === 'Event Details' && (
                        <div>
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
                        </div>
                      )}
                      {section === 'Host Details' && (
                        <div>
                          <Row>
                            <Col>
                              <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                  My Organizations
                                </Dropdown.Toggle>
                                <Dropdown.Menu>{renderMenuItems()}</Dropdown.Menu>
                              </Dropdown>
                            </Col>
                            <Col>
                              <SelectField
                                name="showLocationForm"
                                label="Have location"
                                id={COMPONENT_IDS.ADD_EVENT_FORM_SHOW_LOCATION}
                                options={[{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }]}
                                value={showLocationForm}
                                onChange={(value) => setShowLocationForm(value === 'true')}
                              />
                            </Col>
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
                        </div>
                      )}
                      {section === 'Location' && showLocationForm && (
                        <div>
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
                        </div>
                      )}
                      {section === 'Time of Event' && (
                        <div>
                          <Row>
                            <Col>
                              <DateField name="startTime" id={COMPONENT_IDS.ADD_EVENT_FORM_START_DATE} />
                              <DateField name="endTime" id={COMPONENT_IDS.ADD_EVENT_FORM_END_DATE} />
                            </Col>
                            <Col>
                              <SelectField name="frequency" id={COMPONENT_IDS.ADD_EVENT_FORM_FREQUENCY} />
                            </Col>
                          </Row>
                        </div>
                      )}
                      {section === 'Required Skills & Accessibilities' && (
                        <div>
                          <Row className="justify-content-center">
                            <Col md={4} lg={4}>
                              <SelectField name="requiredSkills" id={COMPONENT_IDS.ADD_EVENT_FORM_REQUIRED_SKILLS} />
                            </Col>
                            <Col md={4} lg={4}>
                              <SelectField name="accessibilities" id={COMPONENT_IDS.ADD_EVENT_FORM_ACCESSIBILITIES} />
                            </Col>
                          </Row>
                        </div>
                      )}
                    </Card.Body>
                    <Card.Footer>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                        {currentSectionIndex > 0 && <Button onClick={goToPreviousSection} id={COMPONENT_IDS.ADD_EVENT_FORM_PREVIOUS_PAGE} className="me-2">Previous page</Button>}
                        {currentSectionIndex < sections.length - 1 && <Button onClick={goToNextSection} id={COMPONENT_IDS.ADD_EVENT_FORM_NEXT_PAGE} className="me-2">Next Page</Button>}
                        {currentSectionIndex === sections.length - 1 && <SubmitField id={COMPONENT_IDS.ADD_EVENT_FORM_SUBMIT} />}
                      </div>
                    </Card.Footer>
                    <ErrorsField />
                  </Card>
                ))}
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
