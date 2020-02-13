import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { validators, constants } from "../../common";
import { authActions, recaptchaActions } from "../../actions";
import { LoadingOverlayComponent, MessageComponent } from "../common";
import { InputComponent } from "../redux-form-components";
import { SignInLink2 } from "./sign-in-container";
import { RecaptchaContainer } from ".";

class ForgotPasswordContainer extends Component {
  UNSAFE_componentWillMount() {
    this.props.recaptchaActions.resetReCaptcha();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pristine !== this.props.pristine && nextProps.pristine) {
      if (nextProps.recaptcha.isSuccess || nextProps.recaptcha.isError) {
        this.props.recaptchaActions.resetReCaptcha();
      }
    }
  }
  forgotPasswordComplete() {
    return (
      <MessageComponent
        header="Success!"
        color="text-success"
        text="You will receive an email with a link to reset your password.
        <p class='mt25'><a class='btn btn-success btn-sm' href='/signin'>Sign-In</a></p>"
      />
    );
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, post } = this.props;
    const overlayLoading = post.isLoading && <LoadingOverlayComponent />;
    if (post.isSuccess) {
      return this.forgotPasswordComplete();
    }
    return (
      <div>
        <div className="container">
          <div className="col-sm-5 col-sm-offset-4 well">
            <h4 className="mb20">Forgot your password?</h4>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
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
    if (this.props.recaptcha.isSuccess && values) {
      this.props.authActions.sendPasswordResetEmail(values);
    } else {
      this.props.recaptchaActions.getReCaptcha();
    }
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

const forgotPasswordForm = reduxForm({ form: "forgotPasswordForm" })(ForgotPasswordContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(forgotPasswordForm);

export const ForgotPasswordLink = () => {
  return (
    <div>
      Forgot your password? <Link to={constants.FORGOT_PASSWORD_URL}>Recover It</Link>
    </div>
  );
};
