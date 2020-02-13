import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../../actions";
import { LoadingOverlayComponent, MessageComponent } from "../common";

class VerifyEmailContainer extends Component {
  componentDidMount() {
    if (!this.props.user.isAuthenticated)
      this.props.authActions.verifyEmail(this.props.match.params.code);
  }
  verifyEmailComplete() {
    return (
      <MessageComponent
        header="Congratulations!"
        color="text-success"
        text="You have successfully verified your email address with us.
        <br />You can now login with your email address and access the site features.
        <p class='mt25'><a class='btn btn-success btn-sm' href='/signin'>Sign-In</a></p>"
      />
    );
  }
  verifyEmailFail() {
    return (
      <MessageComponent
        header="Sorry!"
        color="text-danger"
        text={`${this.props.post.payload.message}
        <p class='mt25'><a class='btn btn-success btn-sm' href='/signin'>Sign-In</a></p>`}
      />
    );
  }
  render() {
    const { post } = this.props;
    const overlayLoading = post.isLoading && <LoadingOverlayComponent />;
    if (post.isSuccess) {
      return this.verifyEmailComplete();
    }
    if (post.isError) {
      return this.verifyEmailFail();
    }
    return <div>{overlayLoading}</div>;
  }
}

function mapStateToProps(state) {
  return {
    post: state.write.submit,
    user: state.read.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailContainer);
