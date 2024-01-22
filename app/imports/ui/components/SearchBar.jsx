import React from 'react';
import Fuse from 'fuse.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from './LoadingSpinner';

const SearchBar = () => {

  const { ready, events } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Event documents.
    const subscription = Events.subscribeStuff();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the event documents
    const items = Events.find({}).fetch();
    return {
      events: items,
      ready: rdy,
    };
  }, []);

  if (ready) {
    console.log('Ready');
    console.log(events);
    const fuseOptions = {
      isCaseSensitive: false,
      shouldSort: true,
      includeMatches: true,
      findAllMatches: true,
      useExtendedSearch: false,
      keys: ['title'],
    };

    if (events && events.length > 0) {
      const fuse = new Fuse(events, fuseOptions);
      const result = fuse.search('Humanitarian');

      return (
        <div>
          <ul>
            {result.map((item) => (
              <li key={item.item._id}>
                <p>{item.item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    // Handle the case when the collection is empty
    return (
      <p>No events found</p>
    );

  }

  return (
    <LoadingSpinner />
  );
};

export default SearchBar;
