import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { constants } from "../../common";
import { usersActions } from "../../actions";
import { LoadingComponent } from "../common";
import { InputComponent, SelectComponent } from "../redux-form-components";
import { validators } from "../../common";
import { usersSelector } from "../../selectors";

class UserContainer extends Component {
  componentDidMount() {
    this.props.actions.getUsers();
    this.props.initialize(this.props.initialValues);
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, post, users, auth } = this.props;
    const userRoles = [
      { key: constants.USER_ROLE },
      { key: constants.MERCHANT_ROLE },
      { key: constants.ADMIN_ROLE },
      { key: constants.BATCH_ADMIN_ROLE },
      { key: constants.SUPER_ADMIN_ROLE }
    ];
    return (
      <div className="container">
        <div className="col-sm-5 col-sm-offset-4 well">
          <h4 className="mb20">User</h4>
          {auth.isLoading || users.isLoading || post.isLoading ? (
            <LoadingComponent />
          ) : (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                id="name"
                name="name"
                label="Name"
                icon="glyphicon-hand-right"
                component={InputComponent}
                className="form-control"
                disabled
                validate={validators.required}
              />
              <Field
                id="role"
                name="role"
                label="Role"
                icon="glyphicon-hand-right"
                component={SelectComponent}
                className="form-control"
                options={userRoles}
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
            Back to <Link to={constants.USERS_URL}>Users</Link>
          </div>
        </div>
      </div>
    );
  }
  handleSubmit = values => {
    const item = {
      id: values.id,
      role: values.role
    };
    this.props.actions.submitUser(item);
  };
}

function mapStateToProps(state, ownProps) {
  const getInitialValues = usersSelector.getInitialValues(state);
  return {
    auth: state.read.auth,
    users: state.read.users,
    post: state.write.submit,
    id: ownProps.match.params.id,
    initialValues: getInitialValues(ownProps.match.params.id)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(usersActions, dispatch)
  };
}

const userForm = reduxForm({ form: "userForm", enableReinitialize: true })(UserContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userForm);
