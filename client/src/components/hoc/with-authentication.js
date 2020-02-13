import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../../actions";
import { constants } from "../../common";
import { UnAuthorizedComponent } from "../common";

const WithAuthentication = roles => WrapperComponent => {
  class WithAuthentication extends Component {
    UNSAFE_componentWillMount() {
      if (!this.props.user.isAuthenticated) {
        this.props.history.replace(constants.SIGN_IN_URL, this.props.location);
      }
    }
    UNSAFE_componentWillUpdate(nextProps) {
      if (!nextProps.user.isAuthenticated) {
        this.props.history.replace(constants.SIGN_IN_URL, nextProps.location);
      }
    }
    render() {
      return roles.includes(this.props.user.role) ? (
        <WrapperComponent {...this.props} />
      ) : (
        <UnAuthorizedComponent />
      );
    }
  }
  function mapStateToProps(state) {
    return {
      user: state.read.auth.user
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      authActions: bindActionCreators(authActions, dispatch)
    };
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithAuthentication);
};

export default WithAuthentication;
