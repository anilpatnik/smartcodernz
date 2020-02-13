import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { constants } from "../../common";
import { usersActions } from "../../actions";
import { LoadingComponent, TableComponent, PagingComponent } from "../common";

class UsersContainer extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      sort: "displayName", // default sort field
      order: constants.ASC, // default sort order
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
    this.props.actions.getUsers();
  }
  render() {
    const { auth, users, post } = this.props;
    let index = 1;
    // initial data
    let payload = users.payload;
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
      {
        field: "photoURL",
        text: constants.EMPTY_STRING,
        className: "text-center",
        isSort: false,
        isPhoto: true
      },
      { field: "displayName", text: "Name", isSort: true },
      { field: "email", text: "Email", isSort: true },
      {
        field: "providers",
        text: constants.EMPTY_STRING,
        className: "text-center",
        isProviders: true,
        isSort: false
      },
      { field: "role", text: "Role", className: "text-center", isSort: true },
      { field: "creationTime", text: "Created", className: "text-center", isSort: true },
      {
        field: "lastSignInTime",
        text: "Signed In",
        className: "text-center",
        isSort: true
      },
      {
        field: "uid",
        text: constants.EMPTY_STRING,
        className: "text-center",
        isSort: false,
        isEdit: true
      },
      {
        field: "uid",
        text: constants.EMPTY_STRING,
        className: "text-center",
        isSort: false,
        isDelete: true
      }
    ];
    return (
      <div className="container">
        <h3 className="page-header no-border">
          Users
          <button
            onClick={this.onRefresh}
            className="btn btn-success btn-sm pull-right"
            disabled={users.isLoading}
          >
            {users.isLoading ? "Loading..." : "Refresh"}
          </button>
        </h3>
        {auth.isLoading || users.isLoading || post.isLoading ? (
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
    const path = `${constants.USERS_URL}/${id}`;
    this.props.history.replace(path);
  }
  onDeleting(id) {
    this.props.actions.deleteUser(id);
  }
  onRefresh() {
    this.props.actions.getUsers();
  }
}

function mapStateToProps(state) {
  return {
    auth: state.read.auth,
    users: state.read.users,
    post: state.write.submit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(usersActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
