import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import _ from "lodash";
import { constants } from "../../common";
import { merchantActions, categoriesActions } from "../../actions";
import { LoadingComponent } from "../common";
import { InputComponent, SelectComponent, AddressComponent } from "../redux-form-components";
import { validators } from "../../common";

class MerchantContainer extends Component {
  componentDidMount() {
    this.props.categoriesActions.getCategories();
    this.props.actions.getMerchant({
      id: this.props.match.params.id,
      value: this.props.auth.user.uid
    });
    this.props.initialize(this.props.initialValues);
  }
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      post,
      merchant,
      categories,
      auth
    } = this.props;
    // filter inactive categories
    const activeCategories = _.filter(categories.payload, o => o.active);
    return (
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2 well">
          <h4 className="mb20">Business Details</h4>
          {auth.isLoading || merchant.isLoading || categories.isLoading || post.isLoading ? (
            <LoadingComponent />
          ) : (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                id="category"
                name="category"
                label="Category"
                icon="glyphicon-hand-right"
                component={SelectComponent}
                className="form-control"
                options={activeCategories}
                validate={validators.required}
              />
              <Field
                id="name"
                name="name"
                type="text"
                label="Business Name"
                icon="glyphicon-hand-right"
                maxlength={50}
                component={InputComponent}
                validate={validators.required}
              />
              <Field
                id="address"
                name="address"
                type="text"
                label="Address"
                icon="glyphicon-hand-right"
                maxlength={100}
                component={AddressComponent}
                validate={validators.required}
              />
              <Field
                id="phone"
                name="phone"
                type="text"
                label="Phone Number"
                icon="glyphicon-hand-right"
                maxlength={30}
                component={InputComponent}
                validate={validators.required}
              />
              <Field
                id="website"
                name="website"
                type="text"
                label="Web Site"
                icon="glyphicon-hand-right"
                link={true}
                component={InputComponent}
              />
              <Field
                id="url"
                name="url"
                type="text"
                label="Google Page"
                placeholder="URL of the official Google page of your business"
                icon="glyphicon-hand-right"
                link={true}
                component={InputComponent}
              />
              <FieldArray name="openingHours" component={renderOpeningHours} />
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
            Back to <Link to={constants.MERCHANTS_URL}>Merchants</Link>
          </div>
        </div>
      </div>
    );
  }
  handleSubmit = values => {
    console.log(values);
  };
}

const renderOpeningHours = ({ fields }) =>
  fields && (
    <div className="panel panel-info mt20">
      <div className="panel-heading">Opening Hours</div>
      <div className="panel-body mt15">
        {fields.map((member, index) => {
          return (
            <React.Fragment key={index}>
              <Field
                id={member}
                name={member}
                type="text"
                placeholder={"anil"}
                icon="glyphicon-hand-right"
                component={InputComponent}
                validate={validators.required}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

function getInitialValues(state) {
  if (!state.read.merchant.payload.result || !state.read.categories.payload) return null;
  // merchant payload
  const payload = state.read.merchant.payload.result;
  // find matching category
  const category = _.find(state.read.categories.payload, o =>
    _.find(payload.types, type => {
      const name = _.replace(type, "_", " ");
      return _.toUpper(name) === _.toUpper(o.name);
    })
  );
  // return object
  return {
    name: payload.name || constants.EMPTY_STRING,
    address: payload.formatted_address || constants.EMPTY_STRING,
    phone: payload.formatted_phone_number || constants.EMPTY_STRING,
    website: payload.website || constants.EMPTY_STRING,
    url: payload.url || constants.EMPTY_STRING,
    category: (category && category.id) || constants.EMPTY_STRING,
    openingHours: payload.opening_hours.weekday_text || constants.EMPTY_ARRAY
  };
}

function mapStateToProps(state, ownProps) {
  return {
    auth: state.read.auth,
    merchant: state.read.merchant,
    categories: state.read.categories,
    post: state.write.submit,
    id: ownProps.match.params.id,
    initialValues: getInitialValues(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(merchantActions, dispatch),
    categoriesActions: bindActionCreators(categoriesActions, dispatch)
  };
}

const merchantForm = reduxForm({ form: "merchantForm", enableReinitialize: true })(
  MerchantContainer
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(merchantForm);
