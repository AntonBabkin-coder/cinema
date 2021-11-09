import React from 'react';
import { Alert } from 'antd';

const WarningIndicator = () => (
  <Alert
    message="No films"
    description="Unfortunately, there are no movies for your request"
    type="warning"
    showIcon
    closable
  />
);

export default WarningIndicator;
