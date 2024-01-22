import React from 'react';
import Fuse from 'fuse.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';

const SearchBar = () => {

  const { event, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Events.userPublicationName);
    const rdy = subscription.ready();
    const item = Events.collection.find({}).fetch();
    return {
      event: item,
      ready: rdy,
    };
  }, []);

  if (ready && event) {

    const fuseOptions = {
      isCaseSensitive: false,
      shouldSort: true,
      includeMatches: true,
      findAllMatches: true,
      useExtendedSearch: false,
      keys: [
        'Event', 'Organization',
      ],
    };

    const fuse = new Fuse(Event, fuseOptions);

    const result = fuse.search('');

    return result;

  }
  return (
    <LoadingSpinner />
  );
};

export default SearchBar;
