import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import { Events } from '../../api/event/EventCollection';
import QRCodeScanner from '../components/QRCodeScanner';
import LoadingSpinner from '../components/LoadingSpinner';

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
      event: theEvent,
      ready: rdy,
    };
  }, []);

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
