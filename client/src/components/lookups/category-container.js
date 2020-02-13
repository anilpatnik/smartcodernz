import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import _ from "lodash";
import { constants, toaster } from "../../common";
import { categoriesActions } from "../../actions";
import { LoadingComponent } from "../common";
import { InputComponent, CheckComponent } from "../redux-form-components";
import { validators } from "../../common";
import { categoriesSelector } from "../../selectors";

class CategoryContainer extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
    this.props.initialize(this.props.initialValues);
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, post, categories, auth } = this.props;
    return (
      <div className="container">
        <div className="col-sm-5 col-sm-offset-4 well">
          <h4 className="mb20">Category</h4>
          {auth.isLoading || categories.isLoading || post.isLoading ? (
            <LoadingComponent />
          ) : (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                id="name"
                name="name"
                type="text"
                label="Name"
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
    const { reset } = this.props;
    if (!_.isEmpty(values)) {
      const categoryIndex = _.findIndex(this.props.categories.payload, o => o.name === values.name);
      if (categoryIndex === -1 || (values.id && values.name === this.props.initialValues.name)) {
        const item = {
          id: values.id,
          name: values.name,
          active: values.active
        };
        this.props.actions.submitCategory(item).then(() => {
          if (!item.id) reset();
        });
      } else {
        toaster("Category exists, please enter a different one.");
      }
    }
  };
}

function mapStateToProps(state, ownProps) {
  const getInitialValues = categoriesSelector.getInitialValues(state);
  return {
    auth: state.read.auth,
    categories: state.read.categories,
    post: state.write.submit,
    id: ownProps.match.params.id,
    initialValues: getInitialValues(ownProps.match.params.id)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoriesActions, dispatch)
  };
}

const categoryForm = reduxForm({ form: "categoryForm", enableReinitialize: true })(
  CategoryContainer
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(categoryForm);
