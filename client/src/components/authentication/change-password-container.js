import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import { authActions } from "../../actions";
import { validators, constants } from "../../common";
import { PasswordStrengthComponent, LoadingOverlayComponent } from "../common";
import { InputComponent } from "../redux-form-components";

class ChangePasswordContainer extends Component {
  constructor() {
    super();
    this.init = { password: constants.EMPTY_STRING };
    this.state = this.init;
  }
  componentDidMount() {
    if (this.props.auth.user.providerId !== constants.PASSWORD) {
      this.props.history.replace(constants.HOME_URL);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pristine) {
      this.setState(this.init);
    }
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, auth, post } = this.props;
    const overlayLoading = (auth.isLoading || post.isLoading) && <LoadingOverlayComponent />;
    return (
      <div>
        <div className="container">
          <div className="col-sm-5 col-sm-offset-4 well">
            <h4 className="mb20">Change Password</h4>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                id="currentpassword"
                name="currentpassword"
                type="password"
                label="Current Password"
                icon="glyphicon-lock"
                maxlength={20}
                component={InputComponent}
                validate={[validators.required]}
              />
              <Field
                id="password"
                name="password"
                type="password"
                label="New Password"
                icon="glyphicon-lock"
                maxlength={20}
                component={InputComponent}
                onChange={this.handlePasswordChange}
                validate={[validators.required, validators.min8]}
              />
              <PasswordStrengthComponent password={this.state.password} />
              <Field
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                label="Confirm New Password"
                icon="glyphicon-lock"
                maxlength={20}
                component={InputComponent}
                validate={[validators.required, validators.passwordMatch]}
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
          </div>
        </div>
        {overlayLoading}
      </div>
    );
  }
  handleSubmit = values => {
    if (!_.isEmpty(values))
      this.props.authActions.changePassword(values).then(() => {
        this.props.reset();
      });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
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
    authActions: bindActionCreators(authActions, dispatch)
  };
}

const changePasswordForm = reduxForm({ form: "changePasswordForm" })(ChangePasswordContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(changePasswordForm);
