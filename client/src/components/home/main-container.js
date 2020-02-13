import React, { Component } from "react";
import { constants } from "../../common";
import { LoadingOverlayComponent } from "../common";

class MainContainer extends Component {
  componentDidMount() {
    // react router location search query string
    // ?mode=resetPassword&oobCode=ABC123&apiKey=AIzaSy...&lang=fr
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const mode = params.get(constants.MODE);
    const actionCode = params.get(constants.ACTION_CODE);
    if (mode === constants.RESET_PASSWORD) {
      this.props.history.replace(`${constants.RESET_PASSWORD_URL}/${actionCode}`);
    } else if (mode === constants.VERIFY_EMAIL) {
      this.props.history.replace(`${constants.VERIFY_EMAIL_URL}/${actionCode}`);
    } else {
      this.props.history.replace(constants.HOME_URL);
    }
  }
  render() {
    return <LoadingOverlayComponent />;
  }
}

export default MainContainer;
