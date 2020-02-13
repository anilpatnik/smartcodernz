import React, { Component } from "react";
import PropTypes from "prop-types";
import { constants } from "../../common";

class SortingComponent extends Component {
  onSorting(e, sort) {
    e.preventDefault();
    if (this.props.onSorting) {
      this.props.onSorting(sort);
    }
  }
  render() {
    const { field, text, isSort, sort, order } = this.props;
    // sort order arrow icon
    const icon = isSort
      ? sort === field &&
        (order === constants.DESC ? (
          <i
            className="glyphicon glyphicon-arrow-up icon-margin-left text-danger"
            aria-hidden="true"
          />
        ) : (
          <i
            className="glyphicon glyphicon-arrow-down icon-margin-left text-danger"
            aria-hidden="true"
          />
        ))
      : null;

    return (
      <div className="text-center">
        {isSort ? (
          <span
            className="sort"
            onClick={e => {
              this.onSorting(e, field);
            }}
          >
            {text}
          </span>
        ) : (
          text
        )}
        {icon}
      </div>
    );
  }
}

SortingComponent.propTypes = {
  field: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isSort: PropTypes.bool.isRequired,
  sort: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onSorting: PropTypes.func.isRequired
};

export default SortingComponent;
