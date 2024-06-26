import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Image, Row, Card } from 'react-bootstrap';
import { Bell, Calendar, GeoAlt, PersonFill, HeartFill, Heart } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import '../css/EventPage.css';
import CommitToEvent from './CommitToEvent';
import GoBackButton from './GoBackButton';
import ConnectButton from './ConnectButton';
import { PAGE_IDS } from '../utilities/PageIDs';

const Event = ({ event, org }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedIsFavorite = localStorage.getItem(`favorite-${event._id}`);
    if (storedIsFavorite !== null) {
      setIsFavorite(storedIsFavorite === 'true');
    }
  }, [event._id]);

  const toggleFavorite = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    localStorage.setItem(`favorite-${event._id}`, newIsFavorite.toString());
  };

  return (
    <Container fluid className="color1" id={PAGE_IDS.VIEW_EVENT}>
      <Container id="view-event-page" className="py-5 justify-content-center">
        <Card className="pageCard">
          <Card.Header className="pageCardHeader">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1>{event.title}</h1>
              <div role="none" style={{ fontSize: '1.9rem', cursor: 'pointer' }} onClick={toggleFavorite}>
                {isFavorite ? <HeartFill color="red" /> : <Heart />}
              </div>
            </div>
          </Card.Header>
          <Row>
            <Col md="auto" className="col-lg-6 col-sm-6 my-auto">
              <Card.Body>
                <Image className="pageCardImage" src={event.image} />
              </Card.Body>
              <Card.Body className="eventDetailsLeft">
                <Row>
                  <Col lg={9} md={12} className="col-12 col-lg-9">
                    <h4>Hosted By:</h4>
                    <Link className="host-link" to={`/org-profile/${event.hostID}`}><h4>{event.hostBy}</h4></Link>
                  </Col>
                  <Col lg={3} md={12} className="col-12 text-end align-content-center">
                    <ConnectButton org={org} />
                  </Col>
                </Row>
                <hr />
                <h5><GeoAlt /> {event.address}, {event.city}, {event.state}, {event.zipCode}, {event.country}</h5>
                <h5><Calendar /> {event.startTime.toDateString()} | {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h5>
                <h5><Bell /> Frequency: {event.frequency}</h5>
                <h5><PersonFill /> Seats: {event.spotsFilled.length}/{event.totalSpots}</h5>
              </Card.Body>
            </Col>
            <Col md="auto" className="col-lg-6 col-sm-6 my-auto">
              <Card.Body className="eventDetailsRight">
                <h5>Description:</h5>
                <p>{event.description}</p>
                <hr />
                <h5>Impact:</h5>
                <p>{event.impact}</p>
              </Card.Body>
              <Card.Body className="eventDetailsRight">
                <h5>Requirements:</h5>
                <p>{event.requirements.join(', ')}</p>
                <hr />
                <h5>Needed Skills:</h5>
                <p>{event.requiredSkills.join(', ')}</p>
                <hr />
                <h5>Accessibilities:</h5>
                <p>{event.accessibilities.join(', ')}</p>
              </Card.Body>
            </Col>
          </Row>
          <Card.Footer className="pageCardFooter">
            <Container className="d-flex">
              <GoBackButton />
              <CommitToEvent event={event} />
            </Container>
          </Card.Footer>
        </Card>
      </Container>
    </Container>
  );
};

// Require a document to be passed to this component.
Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    address: PropTypes.string,
    zipCode: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    totalSpots: PropTypes.number,
    spotsFilled: PropTypes.instanceOf(Array),
    time: PropTypes.instanceOf(Date),
    startTime: PropTypes.instanceOf(Date),
    frequency: PropTypes.string,
    accessibilities: PropTypes.instanceOf(Array),
    requiredSkills: PropTypes.instanceOf(Array),
    requirements: PropTypes.instanceOf(Array),
    impact: PropTypes.string,
    hostBy: PropTypes.string,
    hostID: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  org: PropTypes.shape({
    contactEmail: PropTypes.string,
  }).isRequired,
};

export default Event;
