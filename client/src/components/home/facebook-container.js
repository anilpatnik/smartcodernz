import React, { Component } from "react";
import { connect } from "react-redux";
import { firebase } from "../../config";
import { constants } from "../../common";

class FacebookContainer extends Component {
  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      firebase
        .database()
        .ref()
        .child(constants.USERS_FB)
        .child(this.props.user.uid)
        .once(constants.VALUE)
        .then(snap => {
          const user = snap.val();
          if (user.providerId === constants.FACEBOOK) {
            const accessToken = user.accessToken;
            // https://developers.facebook.com/docs/facebook-login/permissions/v3.0

            // Enable Graph API on Facebook account for app admin
            // https://developers.facebook.com/apps/163127021030801/fb-login/settings
            // Valid OAuth Redirect URIs set to my-app.firebaseapp.com/__/auth/handler

            // Access user Facebook API data with access token
            let urlAccessToken = `https://graph.facebook.com/me?fields=gender,birthday&access_token=${accessToken}`;
            fetch(urlAccessToken)
              .then(response => response.json())
              .then(json => console.log(json));
          } else {
            this.props.history.replace(constants.HOME_URL);
          }
        });
    }
  }
  render() {
    return (
      <div>
        <div className="container">...FACEBOOK HOME PAGE...</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.read.auth.user
  };
}

export default connect(mapStateToProps)(FacebookContainer);
