import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { validators, constants } from "../../common";
import { authActions } from "../../actions";
import { PasswordStrengthComponent, LoadingOverlayComponent } from "../common";
import { InputComponent } from "../redux-form-components";
import { SignInLink2 } from "./sign-in-container";

class ResetPasswordContainer extends Component {
  constructor() {
    super();
    this.init = { password: constants.EMPTY_STRING };
    this.state = this.init;
  }
  componentDidMount() {
    if (!this.props.user.isAuthenticated) {
      this.props.authActions.verifyPasswordReset(this.props.match.params.code);
      this.props.initialize(this.props.initialValues);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pristine) {
      this.setState(this.init);
    }
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, post, auth } = this.props;
    const overlayLoading = (post.isLoading || auth.isLoading) && <LoadingOverlayComponent />;
    return (
      <div>
        <div className="container">
          <div className="col-sm-5 col-sm-offset-4 well">
            <h4 className="mb20">Reset Password</h4>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                id="email"
                name="email"
                type="email"
                label="Email"
                icon="glyphicon-envelope"
                maxlength={30}
                disabled
                component={InputComponent}
                validate={[validators.required, validators.email]}
              />
              <Field
                id="password"
                name="password"
                type="password"
                label="Password"
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
                label="Confirm Password"
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
            <div className="mt25 text-center">
              <div>
                <SignInLink2 />
              </div>
            </div>
          </div>
        </div>
        {overlayLoading}
      </div>
    );
  }
  handleSubmit = values => {
    if (values) this.props.authActions.confirmPasswordReset(this.props.match.params.code, values);
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };
}

function mapStateToProps(state) {
  return {
    auth: state.read.auth,
    user: state.read.auth.user,
    post: state.write.submit,
    initialValues: {
      email:
        (state.write.submit.payload.length > 0 && state.write.submit.payload) ||
        constants.EMPTY_STRING
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

const resetPasswordForm = reduxForm({ form: "resetPasswordForm", enableReinitialize: true })(
  ResetPasswordContainer
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(resetPasswordForm);
