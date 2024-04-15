import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
import { userAddHours, organizationAddHours } from '../../startup/both/Methods';
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
    const subscription = Events.subscribeSingleEvent(eventId._id);
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
    const subscription = Organization.subscribeSingleOrganization(event.hostID);
    const rdy = subscription.ready();
    const org = Organization.findOne({ _id: event.hostID });
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
        swal('Success', `Successfully updated ${foundUser.firstName}&apos;s hours.`, 'success');
        setResult('');
        Meteor.call(organizationAddHours, event.hostID, totalHours, (error2) => {
          if (error2) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', `Successfully updated ${orgHours.name} hours.`, 'success');
          }
        });
      }
    });
  };

  return ready && ready2 && ready3 ? (
    <Container fluid className="color2">
      <Container className="text-center py-3">
        <Row className="text-center justify-content-center py-3">
          <Col className="col-11">
            <Card className="rounded-4">
              <h1>Record Hours</h1>
              <h3>Event: {event.title}</h3>
              <h4>Scan the volunteer&apos;s QR code to record hours.</h4>
            </Card>
            <QRCodeScanner onResultChange={handleResultChange} />
            <h6 id="result">{result}</h6>
            <Row className="py-2">
              <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                <HiddenField name="totalHours" />
                <SubmitField />
                <ErrorsField />
              </AutoForm>
            </Row>
            {/* Display user information */}
            {foundUser ? (
              <Container>
                <Card className="rounded-4 pt-1">
                  <h2>User found:</h2>
                  <h4>Name: {foundUser.firstName} {foundUser.lastName}</h4>
                </Card>
                {/* Display any other relevant user information */}
              </Container>
            ) : (
              <Container>
                <Card className="rounded-4 pt-1">
                  <h4>No user found</h4>
                </Card>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default OrgScanQR;
