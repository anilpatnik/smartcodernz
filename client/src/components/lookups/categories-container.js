import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { constants } from "../../common";
import { categoriesActions } from "../../actions";
import { LoadingComponent, TableComponent, PagingComponent } from "../common";

class CategoriesContainer extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      sort: "updated", // default sort field
      order: constants.DESC, // default sort order
      page: 1, // page index
      size: 10 // no. of records on the page
    };
    this.onSorting = this.onSorting.bind(this);
    this.onPaging = this.onPaging.bind(this);
    this.onSelecting = this.onSelecting.bind(this);
    this.onDeleting = this.onDeleting.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }
  componentDidMount() {
    this.props.actions.getCategories();
  }
  render() {
    const { auth, categories, post } = this.props;
    let index = 1;
    // initial data
    let payload = categories.payload;
    // sorted data
    payload = _.orderBy(payload, [this.state.sort], [this.state.order]);
    // payload with id
    payload = _.map(payload, o => _.extend({ index: index++ }, o));
    // paged data
    const startIndex = (this.state.page - 1) * this.state.size;
    const endIndex = Math.min(startIndex + this.state.size - 1, payload.length - 1);
    const data = payload.slice(startIndex, endIndex + 1);
    // table object
    const table = [
      { field: "index", text: "#", className: "text-center", isSort: false },
      { field: "name", text: "Name", isSort: true },
      { field: "active", text: "Active", className: "text-center", isSort: true },
      { field: "updated", text: "Date", className: "text-center", isSort: true },
      {
        field: "id",
        text: constants.EMPTY_STRING,
        className: "text-center",
        isSort: false,
        isEdit: true
      },
      {
        field: "id",
        text: constants.EMPTY_STRING,
        className: "text-center",
        isSort: false,
        isDelete: true
      }
    ];
    return (
      <div className="container">
        <h3 className="page-header no-border">
          Categories
          <p className="btn-toolbar pull-right">
            <button
              onClick={this.onRefresh}
              className="btn btn-success btn-sm"
              disabled={categories.isLoading}
            >
              {categories.isLoading ? "Loading..." : "Refresh"}
            </button>
            <button
              onClick={() => this.onSelecting(constants.NEW)}
              className="btn btn-primary btn-sm"
            >
              Add
            </button>
          </p>
        </h3>
        {auth.isLoading || categories.isLoading || post.isLoading ? (
          <LoadingComponent />
        ) : (
          <div>
            <TableComponent
              payload={data}
              table={table}
              sort={this.state.sort}
              order={this.state.order}
              onSorting={this.onSorting}
              onSelecting={this.onSelecting}
              onDeleting={this.onDeleting}
            />
            <PagingComponent
              onPaging={this.onPaging}
              currentPage={this.state.page}
              pageSize={this.state.size}
              pagerSize={10}
              totalItems={payload.length}
            />
          </div>
        )}
      </div>
    );
  }
  onSorting(sort) {
    const order = this.state.order === constants.DESC ? constants.ASC : constants.DESC;
    this.setState({ sort, order });
  }
  onPaging(page) {
    this.setState({ page });
  }
  onSelecting(id) {
    const path = `${constants.CATEGORIES_URL}/${id}`;
    this.props.history.replace(path);
  }
  onDeleting(id) {
    this.props.actions.deleteCategory(id);
  }
  onRefresh() {
    this.props.actions.getCategories();
  }
}

function mapStateToProps(state) {
  return {
    auth: state.read.auth,
    categories: state.read.categories,
    post: state.write.submit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoriesActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesContainer);
