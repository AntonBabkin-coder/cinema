import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

export function Search({ search }) {
  return (
    <div className="search">
      <input type="text" placeholder="Type to search" onChange={search} />
    </div>
  );
}

Search.defaultProps = {
  search: () => {},
};

Search.propTypes = {
  search: PropTypes.func,
};
