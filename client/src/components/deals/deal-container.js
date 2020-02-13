import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { constants } from "../../common";
import { categoriesActions } from "../../actions";
import { LoadingComponent } from "../common";
import { InputComponent, CheckComponent, AddressComponent } from "../redux-form-components";
import { validators } from "../../common";

class DealContainer extends Component {
  componentDidMount() {
    // this.props.actions.getCategories();
    // this.props.initialize(this.props.initialValues);
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, post, auth } = this.props;
    return (
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2 well">
          <h4 className="mb20">Business</h4>
          {auth.isLoading || post.isLoading ? (
            <LoadingComponent />
          ) : (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                id="name"
                name="name"
                type="text"
                label="Business Name"
                icon="glyphicon-hand-right"
                maxlength={30}
                component={InputComponent}
                validate={validators.required}
              />
              <Field
                id="active"
                name="active"
                type="checkbox"
                label="Active"
                component={CheckComponent}
              />
              <Field
                id="address"
                name="address"
                label="Address"
                icon="glyphicon-hand-right"
                component={AddressComponent}
                validate={validators.required}
              />
              <div className="mt25 text-center">
                <span className="mr5">
                  <button
                    type="submit"
                    disabled={submitting || post.isLoading}
                    className="btn btn-success btn-sm"
                  >
                    {post.isLoading ? "Loading..." : "Submit"}
                  </button>
                </span>
                <span className="ml5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Reset
                  </button>
                </span>
              </div>
            </form>
          )}
          <div className="mt25 text-center">
            Back to <Link to={constants.CATEGORIES_URL}>Categories</Link>
          </div>
        </div>
      </div>
    );
  }
  handleSubmit = values => {
    console.log("submit", values);
  };
}

function mapStateToProps(state) {
  return {
    auth: state.read.auth,
    post: state.write.submit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoriesActions, dispatch)
  };
}

const businessForm = reduxForm({ form: "businessForm", enableReinitialize: true })(DealContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(businessForm);
