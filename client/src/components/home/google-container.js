import React, { Component } from "react";
import { connect } from "react-redux";
import { firebase } from "../../config";
import { constants } from "../../common";

class GoogleContainer extends Component {
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
          if (user.providerId === constants.GOOGLE) {
            const accessToken = user.accessToken;
            // https://developers.google.com/identity/protocols/OAuth2

            // Enable People API on Google account for app admin
            // https://console.developers.google.com/apis/dashboard?project=app

            // Verify user access token is valid
            const urlVerifyToken = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`;
            fetch(urlVerifyToken)
              .then(response => response.json())
              .then(json => console.log(json));

            // Access user Google API data with access token
            const urlAccessToken = `https://people.googleapis.com/v1/people/me?personFields=genders,birthdays&access_token=${accessToken}`;
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
        <div className="container">...GOOGLE HOME PAGE...</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.read.auth.user
  };
}

export default connect(mapStateToProps)(GoogleContainer);
