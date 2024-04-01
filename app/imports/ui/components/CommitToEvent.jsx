import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from './LoadingSpinner';
import { deleteMyEvents, updateMyEvents } from '../../startup/both/Methods';

/*
 * calls the meteor method to update both UserProfile and Events collection.
 * @param user the User
 * @param event the Event
 */
const commitSubmission = ({ user, event }) => {
  Meteor.call(updateMyEvents, user._id, event._id, { user }, { event }, (error) => (error ?
    swal('Error', error.message, 'error') :
    swal('Success', `Successfully registered for ${event.title}`, 'success')));
};
const uncommitSubmission = ({ user, event }) => {
  Meteor.call(deleteMyEvents, user._id, event._id, { user }, { event }, (error) => (error ?
    swal('Error', error.message, 'error') :
    swal('Success', `Successfully unregistered for ${event.title}`, 'success')));
};

/*
 * renders the connect and commit buttons for the user, if they are clicked, call the submission function.
 * @param event the Event they are committing/connecting to
 */
const CommitToEvent = ({ event }) => {
  const { ready, user } = useTracker(() => {
    // get the current user
    const currentUser = Meteor.user();
    // if user is logged in
    if (currentUser) {
      // subscribe to UserProfile collection
      const subscription = UserProfiles.subscribeUser();
      // fetch the corresponding user
      const theUser = UserProfiles.findOne({ email: currentUser.username });
      return {
        ready: subscription ? subscription.ready() : false,
        user: theUser,
      };
    }
    // if user is not logged in, return null value for if statement
    return {
      user: currentUser,
    };
  });
  // if user is logged in, commit and connect buttons will perform commitSubmission
  if (user) {
    if (ready) {
      return (
        event.spotsFilled.includes(user._id) ? (
          <Container className="d-flex justify-content-end">
            <Button id="commit-button" variant="danger" onClick={() => uncommitSubmission({ user, event })}>Uncommit
            </Button>
          </Container>
        ) : (
          <Container className="d-flex justify-content-end">
            <Button id="commit-button" className="commit-btn" variant="success" onClick={() => commitSubmission({ user, event })}>Commit
            </Button>
          </Container>
        )
      );
    }
    return <LoadingSpinner />;
  }
  // otherwise, they will redirect to the sign-in page
  return (
    <Container className="d-flex justify-content-end">
      <Link to="/signin"><Button className="mx-2 commit-btn" variant="sucess">Commit</Button></Link>
    </Container>
  );
};

CommitToEvent.propTypes = {
  event: (PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    time: PropTypes.instanceOf(Date),
    frequency: PropTypes.string,
    accessibilities: PropTypes.instanceOf(Array),
    spotsFilled: PropTypes.instanceOf(Array),
    requirements: PropTypes.instanceOf(Array),
    impact: PropTypes.string,
    hostBy: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
};

export default CommitToEvent;
