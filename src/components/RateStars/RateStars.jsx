import React from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import './rateStars.css';

const RateStars = ({ getRatedMovie, setValue }) => (
  <div className="rate">
    <Rate
      allowHalf
      defaultValue={setValue}
      count={10}
      style={{ fontSize: 16 }}
      onChange={(value) => getRatedMovie(value)}
    />
  </div>
);

RateStars.defaultProps = {
  getRatedMovie: () => {},
  setValue: 0,
};

RateStars.propTypes = {
  getRatedMovie: PropTypes.func,
  setValue: PropTypes.number,
};

export default RateStars;
