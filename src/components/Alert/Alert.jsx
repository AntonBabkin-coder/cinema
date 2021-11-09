import React from 'react';
import { Alert } from 'antd';

const ErrorIndicator = () => (
  <Alert message="Error" description="There is no internet connection." type="error" showIcon />
);

export default ErrorIndicator;
