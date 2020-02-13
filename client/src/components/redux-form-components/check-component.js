import React, { Component } from "react";

class CheckComponent extends Component {
  render() {
    const {
      label,
      id,
      input,
      type,
      disabled,
      meta: { touched, error }
    } = this.props;
    return (
      <div className="checkbox">
        <label htmlFor={id} className="switch">
          <input {...input} id={id} type={type} disabled={disabled} />
          <div className="slider" />
        </label>
        <span className="toggle-label">{label}</span>
        {touched &&
          error && (
            <span className="has-error">
              <span className="help-block" dangerouslySetInnerHTML={{ __html: error }} />
            </span>
          )}
      </div>
    );
  }
}

export default CheckComponent;
