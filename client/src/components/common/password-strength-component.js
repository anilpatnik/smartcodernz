import React, { Component } from "react";
import PropTypes from "prop-types";
import zxcvbn from "zxcvbn";
import { constants } from "../../common";

class PasswordStrengthComponent extends Component {
  constructor(props) {
    super(props);
    this.init = { now: 0, bar: "danger", strength: constants.EMPTY_STRING };
    this.state = this.init;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const score = nextProps.password && zxcvbn(nextProps.password).score;
    const now = 25 * (score === 0 || score);
    let bar = "progress-bar-danger";
    let strength = now > 0 && "Weak";
    switch (score) {
      case 1:
        strength = "Okay";
        break;
      case 2:
        bar = "progress-bar-warning";
        strength = "Good";
        break;
      case 3:
        bar = "progress-bar-info";
        strength = "Strong";
        break;
      case 4:
        bar = "progress-bar-success";
        strength = "Secure";
        break;
      default:
        break;
    }
    this.setState({ now, bar, strength });
  }
  render() {
    if (this.state.now === 0) {
      return null;
    }
    return (
      <div className="progress">
        <div
          className={`progress-bar progress-bar-striped ${this.state.bar}`}
          role="progressbar"
          aria-valuenow={this.state.now}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${this.state.now}%` }}
        >
          {this.state.strength}
        </div>
      </div>
    );
  }
}

PasswordStrengthComponent.propTypes = {
  password: PropTypes.string.isRequired
};

export default PasswordStrengthComponent;
