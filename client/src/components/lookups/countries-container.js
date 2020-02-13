import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { constants } from "../../common";
import { countriesActions } from "../../actions";
import { LoadingComponent, TableComponent, PagingComponent } from "../common";

class CountriesContainer extends Component {
  static propTypes = {
    countries: PropTypes.object.isRequired
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
    this.onRefresh = this.onRefresh.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }
  componentDidMount() {
    this.props.actions.getCountries();
  }
  render() {
    const { auth, countries, post } = this.props;
    let index = 1;
    // initial data
    let payload = countries.payload;
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
      { field: "updated", text: "Date", className: "text-center", isSort: true }
    ];
    return (
      <div className="container">
        <h3 className="page-header no-border">
          Countries
          <p className="btn-toolbar pull-right">
            <button
              onClick={this.onRefresh}
              className="btn btn-success btn-sm"
              disabled={countries.isLoading}
            >
              {countries.isLoading ? "Loading..." : "Refresh"}
            </button>
            <button onClick={this.onLoad} className="btn btn-primary btn-sm">
              Sync
            </button>
          </p>
        </h3>
        {auth.isLoading || countries.isLoading || post.isLoading ? (
          <LoadingComponent />
        ) : (
          <div>
            <TableComponent
              payload={data}
              table={table}
              sort={this.state.sort}
              order={this.state.order}
              onSorting={this.onSorting}
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
  onRefresh() {
    this.props.actions.getCountries();
  }
  onLoad() {
    this.props.actions.loadCountries();
  }
}

function mapStateToProps(state) {
  return {
    auth: state.read.auth,
    countries: state.read.countries,
    post: state.write.submit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(countriesActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountriesContainer);
