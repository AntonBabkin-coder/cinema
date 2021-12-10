import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';
import { Pagination } from 'antd';

export const PaginationPage = ({ paginate, totalPages, currentPage }) => (
  <Pagination defaultCurrent={1} total={totalPages} onChange={paginate} current={currentPage} showSizeChanger={false} />
);

PaginationPage.defaultProps = {
  paginate: () => {},
  currentPage: 1,
  totalPages: 0,
};

PaginationPage.propTypes = {
  paginate: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};
