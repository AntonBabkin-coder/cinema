import React from 'react';
import PropTypes from 'prop-types';

export const Genre = ({ name }) => <span>{name}</span>;
Genre.defaultProps = {
  name: '',
};

Genre.propTypes = {
  name: PropTypes.string,
};
