import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { merchantActions } from "../../actions";
import { LoadingComponent, TableComponent, PagingComponent } from "../common";
import { constants } from "../../common";

class MerchantsContainer extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      sort: "name", // default sort field
      order: constants.ASC, // default sort order
      page: 1, // page index
      size: 10, // no. of records on the page
      token: constants.EMPTY_STRING // next page token
    };
    this.state = { ...this.initialState, name: constants.EMPTY_STRING };
    this.onSorting = this.onSorting.bind(this);
    this.onPaging = this.onPaging.bind(this);
    this.onSelecting = this.onSelecting.bind(this);
  }
  componentDidMount() {
    this.props.actions.resetFindMerchants();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.post.payload.results &&
      nextProps.post.payload.results !== this.props.post.payload.results
    ) {
      this.setState({ token: nextProps.post.payload.next_page_token });
      const arrMerchants = _.values(this.props.merchants.payload);
      const merchants = arrMerchants.concat(nextProps.post.payload.results);
      this.props.actions.getMerchants(merchants);
    }
  }
  render() {
    const { post, auth, merchants } = this.props;
    const no_of_merchants = Object.keys(merchants.payload).length;
    let index = 1;
    // initial data
    let payload = merchants.payload;
    // sorted data
    payload = _.orderBy(payload, [this.state.sort], [this.state.order]);
    // payload with id
    payload = _.map(payload, o => _.extend({ sl: index++ }, o));
    // paged data
    const startIndex = (this.state.page - 1) * this.state.size;
    const endIndex = Math.min(startIndex + this.state.size - 1, payload.length - 1);
    const data = payload.slice(startIndex, endIndex + 1);
    // table object
    const table = [
      { field: "sl", text: "#", className: "text-center", isSort: false },
      {
        field: "icon",
        text: constants.EMPTY_STRING,
        className: "text-center",
        isSort: false,
        isPhoto: true
      },
      { field: "name", text: "Name", isSort: true },
      { field: "formatted_address", text: "Address", isSort: true },
      {
        field: "place_id",
        text: constants.EMPTY_STRING,
        className: "text-center",
        isSort: false,
        isEdit: true
      }
    ];
    return (
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2 well">
          <h4 className="mb20">Find your Business</h4>
          {auth.isLoading ? (
            <LoadingComponent />
          ) : (
            <div>
              <form
                onSubmit={this.handleSubmit}
                onReset={this.handleReset}
                className="form-horizontal mb20"
              >
                <div className="form-group">
                  <div className="col-sm-8">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      maxLength={30}
                      value={this.state.name}
                      className="form-control full-width"
                      placeholder="Enter your business name and search"
                      onChange={this.handleChange}
                    />
                  </div>
                  <span className="mr5">
                    <button type="submit" className="btn btn-success">
                      {no_of_merchants === 0 && post.isLoading
                        ? constants.LOADING
                        : constants.SEARCH}
                    </button>
                  </span>
                  <span className="ml5">
                    <button type="reset" className="btn btn-secondary">
                      {constants.RESET}
                    </button>
                  </span>
                </div>
              </form>
              <div className="pt20">
                {no_of_merchants === 0 && post.isLoading ? (
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
                    />
                    <PagingComponent
                      onPaging={this.onPaging}
                      currentPage={this.state.page}
                      pageSize={this.state.size}
                      pagerSize={10}
                      totalItems={payload.length}
                    />
                    {this.state.token && (
                      <div style={{ marginTop: -55 }}>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm pull-right"
                          onClick={this.handleNextPage}
                        >
                          {post.isLoading ? constants.LOADING : constants.LOAD_MORE}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
    const path = `${constants.MERCHANTS_URL}/${id}`;
    this.props.history.replace(path);
  }
  handleChange = e => {
    this.setState({ name: e.target.value });
  };
  handleReset = e => {
    e.preventDefault();
    this.setState({ name: constants.EMPTY_STRING }, () => this.props.actions.resetFindMerchants());
  };
  handleSubmit = e => {
    e.preventDefault();
    const name = this.state.name;
    if (name) {
      this.setState(
        this.initialState,
        () => this.props.actions.resetGetMerchants(),
        this.props.actions.findMerchants({ name })
      );
    }
  };
  handleNextPage = e => {
    e.preventDefault();
    const token = this.state.token;
    if (token) {
      this.props.actions.findMerchants({ token });
    }
  };
}

function mapStateToProps(state) {
  return {
    auth: state.read.auth,
    merchants: state.read.merchants,
    post: state.write.submit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(merchantActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantsContainer);
