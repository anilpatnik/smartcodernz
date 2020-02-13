import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class PagingComponent extends Component {
  onPaging(e, page) {
    e.preventDefault();
    if (this.props.onPaging) {
      this.props.onPaging(page);
    }
  }
  // returns toal pages per page size array from 1...last page
  getTotalPages(totalItems, pageSize) {
    const totalPages = Math.ceil(totalItems / pageSize); // calculate total pages
    return _.range(1, totalPages + 1); // create an array of pages for the pager
  }
  // returns pager numbers on each pager row per pager defined size
  getPager(currentPage, pagerSize, totalPages) {
    const start = (Math.ceil(currentPage / pagerSize) - 1) * pagerSize; // start page index on each pager row
    const end = start + (pagerSize - 1); // end page index on each pager row
    const pages = totalPages.slice(start, end + 1); // pager numbers on each row per pager size
    return _.map(pages, (value, key) => (
      <li key={key} className={currentPage === value ? "active" : null}>
        <button
          onClick={
            currentPage !== value
              ? e => {
                  this.onPaging(e, value);
                }
              : null
          }
        >
          {value}
        </button>
      </li>
    ));
  }
  render() {
    const { currentPage, pageSize, pagerSize, totalItems } = this.props;
    const totalPages = this.getTotalPages(totalItems, pageSize); // total pages
    const pagerRows = this.getPager(currentPage, pagerSize, totalPages); // pager row numbers
    return (
      <nav aria-label="Page navigation" className="text-center">
        {totalPages.length > 1 ? (
          <ul className="pagination">
            {/* previous button. visible always except when first page is selected */}
            {currentPage === 1 ? null : (
              <li>
                <button
                  aria-label="Previous"
                  onClick={e => {
                    this.onPaging(e, currentPage - 1);
                  }}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
            )}
            {pagerRows}
            {/* next button. visible always unless last page is selected */}
            {currentPage === totalPages.length ? null : (
              <li>
                <button
                  aria-label="Next"
                  onClick={e => {
                    this.onPaging(e, currentPage + 1);
                  }}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            )}
          </ul>
        ) : null}
      </nav>
    );
  }
}

PagingComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pagerSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPaging: PropTypes.func.isRequired
};

export default PagingComponent;
