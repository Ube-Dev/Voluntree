import Fuse from 'fuse.js';

const SearchBar = () => {

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
};

export default SearchBar;
