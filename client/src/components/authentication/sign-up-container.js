import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { validators, constants } from "../../common";
import { authActions, recaptchaActions } from "../../actions";
import { PasswordStrengthComponent, LoadingOverlayComponent, MessageComponent } from "../common";
import { InputComponent } from "../redux-form-components";
import { SignInLink1 } from "./sign-in-container";
import { RecaptchaContainer } from ".";

class SignUpContainer extends Component {
  constructor() {
    super();
    this.init = { password: constants.EMPTY_STRING };
    this.state = this.init;
  }
  UNSAFE_componentWillMount() {
    this.props.recaptchaActions.resetReCaptcha();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pristine) {
      this.setState({ password: constants.EMPTY_STRING });
    }
    if (nextProps.pristine !== this.props.pristine && nextProps.pristine) {
      if (nextProps.recaptcha.isSuccess || nextProps.recaptcha.isError) {
        this.props.recaptchaActions.resetReCaptcha();
      }
    }
  }
  signUpComplete() {
    return (
      <MessageComponent
        header="Thank you for signing up!"
        color="text-success"
        text="We have sent an email with a verification link to your email address.
        <br />Please click the link to verify your email address.
        <p class='mt25'><a class='btn btn-success btn-sm' href='/signin'>Sign-In</a></p>"
      />
    );
  }
  render() {
    const { handleSubmit, pristine, submitting, reset, post } = this.props;
    const overlayLoading = post.isLoading && <LoadingOverlayComponent />;
    if (post.isSuccess) {
      return this.signUpComplete();
    }
    return (
      <div>
        <div className="container">
          <div className="col-sm-5 col-sm-offset-4 well">
            <h4 className="mb20">Sign-Up</h4>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                id="name"
                name="name"
                type="text"
                label="Name"
                icon="glyphicon-user"
                maxlength={30}
                component={InputComponent}
                validate={validators.required}
              />
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
              <div className="mt25">
                <RecaptchaContainer />
              </div>
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
                <SignInLink1 />
              </div>
            </div>
          </div>
        </div>
        {overlayLoading}
      </div>
    );
  }
  handleSubmit = values => {
    if (this.props.recaptcha.isSuccess && values) {
      this.props.authActions.createUser(values);
    } else {
      this.props.recaptchaActions.getReCaptcha();
    }
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };
}

function mapStateToProps(state) {
  return {
    post: state.write.submit,
    recaptcha: state.read.recaptcha
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    recaptchaActions: bindActionCreators(recaptchaActions, dispatch)
  };
}

const signUpForm = reduxForm({ form: "signUpForm" })(SignUpContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(signUpForm);

export const SignUpLink = () => {
  return (
    <div>
      Need to create an account? <Link to={constants.SIGN_UP_URL}>Sign-Up</Link>
    </div>
  );
};
