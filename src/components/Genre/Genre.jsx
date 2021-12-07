import React from 'react';
import PropTypes from 'prop-types';

const Genre = ({ name }) => <span>{name}</span>;
Genre.defaultProps = {
  name: '',
};

Genre.propTypes = {
  name: PropTypes.string,
};

export default Genre;
