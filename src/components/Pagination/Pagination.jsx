import React from 'react';
import PropTypes from 'prop-types';
import './pagination.css';
import { Pagination } from 'antd';

const PaginationPage = ({ paginate, currentPage }) => (
  <Pagination defaultCurrent={1} defaultPageSize={9} total={50} onChange={paginate} current={currentPage} />
);

PaginationPage.defaultProps = {
  paginate: () => {},
  currentPage: 1,
};

PaginationPage.propTypes = {
  paginate: PropTypes.func,
  currentPage: PropTypes.number,
};

export default PaginationPage;
