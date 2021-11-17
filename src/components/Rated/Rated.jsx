import React from 'react';
import PropTypes from 'prop-types';

// import RateStars from '../Rate/Rate';

const Rate = ({ ratedMovies }) => <div>{ratedMovies.length}</div>;

Rate.defaultProps = {
  ratedMovies: [],
};

Rate.propTypes = {
  ratedMovies: PropTypes.arrayOf(PropTypes.any),
};

export default Rate;
