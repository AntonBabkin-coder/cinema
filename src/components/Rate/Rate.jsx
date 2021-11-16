import React from 'react';
import { Rate } from 'antd';
import './rate.css';

const RateStars = () => (
  <div className="rate">
    <Rate allowHalf defaultValue={0} count={10} style={{ fontSize: 16 }} />
  </div>
);

export default RateStars;
