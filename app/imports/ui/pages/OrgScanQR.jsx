import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import { Organization } from '../../api/organization/OrganizationCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { userAddHours, orgAddHours } from '../../startup/both/Methods';
import QRCodeScanner from '../components/QRCodeScanner';
import LoadingSpinner from '../components/LoadingSpinner';

const formSchema = new SimpleSchema({
  totalHours: { type: Number, required: false },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const OrgScanQR = () => {
  const eventId = useParams();
  const [result, setResult] = useState(''); // State to store the result of the QR code scan

  const handleResultChange = (newResult) => {
    setResult(newResult);
  };

  // subscribe to the event
  const { ready, event } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const theEvent = Events.findOne(eventId);
    return {
      ready: rdy,
      event: theEvent,
    };
  }, []);

  // subscribe to users who committed to the event
  const { ready2, userHours } = useTracker(() => {
    if (!ready) {
      return { ready2: false, userHours: [] }; // Return empty array until 'event' is ready
    }
    const subscription = UserProfiles.subscribeUser();
    const rdy = subscription.ready();
    const user = UserProfiles.find({ onGoingEvents: event._id }).fetch();
    return {
      ready2: rdy,
      userHours: user,
    };
  }, [ready, event]);

  // subscribe to the organization host
  const { ready3, orgHours } = useTracker(() => {
    if (!ready) {
      return { ready3: false, orgHours: {} }; // Return empty object until 'event' is ready
    }
    const subscription = Organization.subscribeOrganization();
    const rdy = subscription.ready();
    const org = Organization.findOne({ id: event.id });
    console.log(org);
    return {
      ready3: rdy,
      orgHours: org,
    };
  }, [ready, event]);

  const foundUser = userHours.find(user => user._id === result);

  // updates user and org hours
  const submit = (data) => {
    let totalHours = data;
    const timeDifference = event.endTime.getTime() - event.startTime.getTime(); // Difference in milliseconds
    totalHours = timeDifference / (3600000); // Convert milliseconds to hours
    Meteor.call(userAddHours, result, totalHours, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Successfully updated user hours.', 'success');
      }
    });
    Meteor.call(orgAddHours, orgHours._id, totalHours, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Successfully updated user hours.', 'success');
      }
    });
  };

  return ready && ready2 && ready3 ? (
    <Container className="text-center">
      <Row>
        <Col>
          <h1>{event.title}</h1>
        </Col>
      </Row>
      <Row className="text-center py-3">
        <Col>
          <h1>Record Hours</h1>
          <p>Scan the volunteer&apos;s QR code to record hours.</p>
          <QRCodeScanner onResultChange={handleResultChange} />
          <h6 id="result">{result}</h6>
          {/* Display user information */}
          {foundUser ? (
            <div>
              <h2>User found:</h2>
              <h4>Name: {foundUser.firstName} {foundUser.lastName}</h4>
              <h4>Email: {foundUser.email}</h4>
              {/* Display any other relevant user information */}
            </div>
          ) : (
            <p>No user found with the ID: {result}</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <HiddenField name="totalHours" />
            <SubmitField />
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default OrgScanQR;
