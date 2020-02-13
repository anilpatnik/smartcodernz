import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { firebase } from "../../config";
import { recaptchaActions } from "../../actions";

class RecaptchaContainer extends Component {
  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha", {
      callback: response => this.props.recaptchaActions.getReCaptcha(response)
    });
    window.recaptchaVerifier.render();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.recaptcha.isSuccess !== this.props.recaptcha.isSuccess &&
      !nextProps.recaptcha.isSuccess
    ) {
      window.recaptchaVerifier.reset();
    }
  }
  render() {
    const { recaptcha } = this.props;
    const classFormGroup = (recaptcha.isError && "form-group has-error") || "form-group";
    return (
      <div className={classFormGroup}>
        <div id="recaptcha" className="g-recaptcha" />
        {recaptcha.isError && (
          <span
            className="help-block help-block-recaptcha"
            dangerouslySetInnerHTML={{ __html: "Required" }}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recaptcha: state.read.recaptcha
  };
}

function mapDispatchToProps(dispatch) {
  return {
    recaptchaActions: bindActionCreators(recaptchaActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecaptchaContainer);
