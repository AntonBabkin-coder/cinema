import React from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import './rate.css';

const RateStars = ({ getRatedMovie }) => (
  <div className="rate">
    <Rate allowHalf defaultValue={0} count={10} style={{ fontSize: 16 }} onChange={(value) => getRatedMovie(value)} />
  </div>
);

RateStars.defaultProps = {
  getRatedMovie: () => {},
};

RateStars.propTypes = {
  getRatedMovie: PropTypes.func,
};

export default RateStars;
