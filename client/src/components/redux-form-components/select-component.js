import React, { Component } from "react";
import _ from "lodash";

class SelectComponent extends Component {
  render() {
    const {
      label,
      id,
      icon,
      disabled,
      input,
      options,
      meta: { touched, error }
    } = this.props;
    const classFormGroup = (touched && error && "form-group has-error") || "form-group";
    const renderOptions = _.map(options, (v, k) => {
      return (
        <option key={k} value={v.key || v.name}>
          {v.name || v.key}
        </option>
      );
    });
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
          <select id={id} {...input} className="form-control" disabled={disabled}>
            {renderOptions}
          </select>
        </div>
        {touched && error && (
          <span className="help-block" dangerouslySetInnerHTML={{ __html: error }} />
        )}
      </div>
    );
  }
}

export default SelectComponent;
