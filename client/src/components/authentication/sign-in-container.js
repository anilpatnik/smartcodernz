import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import _ from "lodash";
import { authActions } from "../../actions";
import { LoadingOverlayComponent } from "../common";
import { InputComponent } from "../redux-form-components";
import { validators, constants } from "../../common";
import logo from "../../logo.svg";
import { SignUpLink } from "./sign-up-container";
import { ForgotPasswordLink } from "./forgot-password-container";

class SignInContainer extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting, auth } = this.props;
    const overlayLoading = auth.isLoading && <LoadingOverlayComponent />;
    return (
      <div>
        <div className="container">
          <div className="col-sm-5 col-sm-offset-4 well">
            <div className="text-center">
              <img src={logo} alt="logo" width="150" height="150" />
            </div>
            <div className="mb20 text-center">
              <span className="mr5">
                <button
                  type="button"
                  className="btn btn-google btn-sm"
                  onClick={this.handleGoogleSubmit}
                >
                  Google
                </button>
              </span>
              <span className="ml5">
                <button
                  type="button"
                  className="btn btn-facebook btn-sm"
                  onClick={this.handleFacebookSubmit}
                >
                  Facebook
                </button>
              </span>
            </div>
            <form onSubmit={handleSubmit(this.handlePasswordSubmit)}>
              <Field
                id="email"
                name="email"
                type="email"
                label="Email"
                icon="glyphicon-envelope"
                maxlength={30}
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
                validate={validators.required}
              />
              <div className="mt25 text-center">
                <span className="mr5">
                  <button
                    className="btn btn-success btn-sm"
                    type="submit"
                    disabled={submitting || auth.isLoading}
                  >
                    {auth.isLoading ? "Loading..." : "Submit"}
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
              <div className="mb20">
                <SignUpLink />
              </div>
              <div>
                <ForgotPasswordLink />
              </div>
            </div>
          </div>
        </div>
        {overlayLoading}
      </div>
    );
  }
  handlePasswordSubmit = values => {
    if (!_.isEmpty(values)) this.props.authActions.signIn(values);
  };
  handleGoogleSubmit = () => {
    this.props.authActions.signInWithGoogle();
  };
  handleFacebookSubmit = () => {
    this.props.authActions.signInWithFacebook();
  };
}

function mapStateToProps(state) {
  return {
    auth: state.read.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

const signInForm = reduxForm({ form: "signInForm" })(SignInContainer);
export default connect(mapStateToProps, mapDispatchToProps)(signInForm);

export const SignInLink1 = () => {
  return (
    <div>
      Have an account? <Link to={constants.SIGN_IN_URL}>Sign-In</Link>
    </div>
  );
};

export const SignInLink2 = () => {
  return (
    <div>
      Back to <Link to={constants.SIGN_IN_URL}>Sign-In</Link>
    </div>
  );
};
