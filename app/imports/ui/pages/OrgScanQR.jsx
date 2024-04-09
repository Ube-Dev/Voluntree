import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import { Events } from '../../api/event/EventCollection';
import { Organization } from '../../api/organization/OrganizationCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import QRCodeScanner from '../components/QRCodeScanner';
import LoadingSpinner from '../components/LoadingSpinner';

const OrgScanQR = () => {
  const eventId = useParams();
  const [result, setResult] = useState(''); // State to store the result of the QR code scan

  const handleResultChange = (newResult) => {
    setResult(newResult);
  };

  // subscribe to the event
  const { ready, event, userHours, orgHours } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const subscription2 = Organization.subscribeOrganization();
    const subscription3 = UserProfiles.subscribeUser();
    const rdy = subscription.ready();
    const rdy2 = subscription2.ready();
    const rdy3 = subscription3.ready();
    const theEvent = Events.findOne(eventId);
    const theUserHours = UserProfiles.find({}).fetch();
    const theOrgHours = Organization.find({}).fetch();
    return {
      ready: rdy, rdy2, rdy3,
      event: theEvent,
      userHours: theUserHours,
      orgHours: theOrgHours,
    };
  }, []);

  console.log(event);
  console.log(userHours);
  console.log(orgHours);

  return ready ? (
    <Container>
      <Row className="text-center py-3">
        <Col>
          <h1>Record Hours</h1>
          <p>Scan the volunteer&apos;s QR code to record hours.</p>
          <QRCodeScanner onResultChange={handleResultChange} />
          <h1 id="result">{result}</h1>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default OrgScanQR;
