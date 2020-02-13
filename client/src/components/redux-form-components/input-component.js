import React, { Component } from "react";

class InputComponent extends Component {
  render() {
    const {
      label,
      id,
      input,
      type,
      icon,
      link,
      maxlength,
      disabled,
      meta: { touched, error }
    } = this.props;
    const classFormGroup = (touched && error && "form-group has-error") || "form-group";
    return (
      <div className={classFormGroup}>
        <label className="control-label" htmlFor={id}>
          {label}
        </label>
        <div className="input-group">
          {icon && (
            <span className="input-group-addon">
              <span className={`glyphicon ${icon}`} />
            </span>
          )}
          <input
            {...input}
            id={id}
            type={type}
            className="form-control"
            placeholder={label}
            maxLength={maxlength}
            disabled={disabled}
          />
          {link && (
            <span className="input-group-addon">
              <a href={input.value} target="_blank" rel="noopener noreferrer">
                <span className="glyphicon glyphicon-globe" />
              </a>
            </span>
          )}
        </div>
        {touched && error && (
          <span className="help-block" dangerouslySetInnerHTML={{ __html: error }} />
        )}
      </div>
    );
  }
}

export default InputComponent;
