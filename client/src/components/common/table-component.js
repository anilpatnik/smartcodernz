import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Table } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaEnvelope } from "react-icons/fa";
import { SortingComponent, ImageComponent } from "../common";
import { constants } from "../../common";

class TableComponent extends Component {
  // on row select
  onSelecting(id) {
    if (this.props.onSelecting) {
      this.props.onSelecting(id);
    }
  }
  // on row delete
  onDeleting(id) {
    if (this.props.onDeleting) {
      this.props.onDeleting(id);
    }
  }
  // returns table headers
  getTableHeaders(table) {
    return _.map(table, (value, key) => (
      <th key={key}>
        <SortingComponent
          field={value.field}
          text={value.text}
          isSort={value.isSort}
          sort={this.props.sort}
          order={this.props.order}
          onSorting={this.props.onSorting}
        />
      </th>
    ));
  }
  // returns table rows
  getTableRows(payload, table) {
    return _.map(payload, (value, key) => (
      <tr key={key}>
        {_.map(table, (v, k) => {
          let text = value[v.field];
          const rowClass = `row-middle ${v.className}`;
          // checks if value is classified as a boolean primitive or object
          const isBool = _.isBoolean(text);
          if (isBool) {
            text = text ? (
              <i className="glyphicon glyphicon-ok" aria-hidden="true" />
            ) : (
              <i className="glyphicon glyphicon-remove" aria-hidden="true" />
            );
          }
          // image row
          if (v.isPhoto) {
            text = <ImageComponent text={text} />;
          }
          // providers row
          if (v.isProviders) {
            const providers = value[v.field];
            text = _.map(providers, (value, key) => {
              if (value === constants.GOOGLE)
                return <FaGoogle className="text-danger icon-margin" size={20} key={key} />;
              else if (value === constants.FACEBOOK)
                return <FaFacebook className="text-primary icon-margin" size={20} key={key} />;
              else return <FaEnvelope className="text-warning icon-margin" size={20} key={key} />;
            });
          }
          // edit row
          if (v.isEdit) {
            text = (
              <i
                className="glyphicon glyphicon-edit cursor text-info"
                aria-hidden="true"
                onClick={() => {
                  this.onSelecting(value[v.field]);
                }}
                title="Edit"
              />
            );
          }
          // delete row
          if (v.isDelete) {
            text = (
              <i
                className="glyphicon glyphicon-trash cursor text-danger"
                aria-hidden="true"
                onClick={() => {
                  this.onDeleting(value[v.field]);
                }}
                title="Delete"
              />
            );
          }
          // return table.td
          return (
            <td key={k} className={rowClass}>
              {text}
            </td>
          );
        })}
      </tr>
    ));
  }
  render() {
    const { payload, table } = this.props;
    // table headers
    const headers = table ? this.getTableHeaders(table) : null;
    // table rows
    const rows = payload ? this.getTableRows(payload, table) : null;
    return (
      <React.Fragment>
        {payload && payload.length > 0 && (
          <Table striped bordered responsive>
            <thead>
              <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </React.Fragment>
    );
  }
}

TableComponent.propTypes = {
  payload: PropTypes.array.isRequired,
  table: PropTypes.array.isRequired,
  sort: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onSorting: PropTypes.func,
  onSelecting: PropTypes.func,
  onDeleting: PropTypes.func
};

export default TableComponent;
