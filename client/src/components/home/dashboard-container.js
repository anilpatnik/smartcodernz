import React, { Component } from "react";
import { connect } from "react-redux";

class DashboardContainer extends Component {
  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      /* get current user from firebase auth changed
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log("onAuthStateChanged => ", user);
        }
      });
      */
    }
  }
  render() {
    return (
      <div>
        <div className="container">...HOME PAGE...</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.read.auth.user
  };
}

export default connect(mapStateToProps)(DashboardContainer);
