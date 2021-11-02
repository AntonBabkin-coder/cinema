import React from 'react';
import PropTypes from 'prop-types';
import './search.css';

function Search({ search }) {
  Search.defaultProps = {
    search: () => {},
  };

  Search.propTypes = {
    search: PropTypes.func,
  };

  return (
    <div className="search">
      <input type="text" placeholder="Type to search" onChange={search} />
    </div>
  );
}

export default Search;
