import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../LoadingSpinner';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';

const OrgProfileCard = () => {
  const { ready, organization } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Organization Profile documents.
    const subscription = Meteor.subscribe(OrganizationProfiles._id);
    // Determine if the subscriptions are ready
    const rdy = subscription.ready();
    // Get the Student and Reputation documents
    const orgItems = OrganizationProfiles.collection.find({}).fetch();
    console.log(orgItems);
    return {
      student: orgItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <h1>Organization Profile</h1>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default OrgProfileCard;
