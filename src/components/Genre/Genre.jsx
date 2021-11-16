import React from 'react';
import PropTypes from 'prop-types';

const Genre = ({ name }) => <span>{name}</span>;
Genre.defaultProps = {
  name: '',
  //   intersection: {},
  //   genreArr: [],
};

Genre.propTypes = {
  name: PropTypes.string,
  //   intersection: PropTypes.arrayOf(PropTypes.object),
  //   genreArr: PropTypes.arrayOf(PropTypes.object),
};

export default Genre;
