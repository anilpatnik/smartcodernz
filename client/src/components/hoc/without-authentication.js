import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../../actions";
import { constants } from "../../common";

const WithoutAuthentication = WrapperComponent => {
  class WithoutAuthentication extends Component {
    UNSAFE_componentWillMount() {
      const url = this.props.location.state
        ? this.props.location.state.pathname
        : constants.HOME_URL;
      if (this.props.user.isAuthenticated) {
        this.props.history.replace(url);
      }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
      const url = nextProps.location.state ? nextProps.location.state.pathname : constants.HOME_URL;
      if (nextProps.user.isAuthenticated) {
        this.props.history.replace(url);
      }
    }
    render() {
      return <WrapperComponent {...this.props} />;
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
  )(WithoutAuthentication);
};

export default WithoutAuthentication;
