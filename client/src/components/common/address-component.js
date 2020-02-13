import React, { Component } from "react";
import PropTypes from "prop-types";
import { constants } from "../../common";

class AddressComponent extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      // active selection index
      activeAddress: 0,
      // suggestions that match the user input
      filteredSuggestions: [],
      // whether or not the address list is shown
      showSuggestions: false,
      // what the user has entered
      userInput: constants.EMPTY_STRING
    };
  }

  onChange = e => {
    const userInput = e.target.value;
    // filter our suggestions that don't contain the user input
    const filteredSuggestions = this.props.suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeAddress: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: userInput
    });
    this.props.input.onChange(userInput);
  };

  onClick = e => {
    const userInput = e.target.innerText;
    this.setState({
      activeAddress: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: userInput
    });
    this.props.input.onChange(userInput);
  };

  onKeyDown = e => {
    const { activeAddress, filteredSuggestions } = this.state;
    // user pressed the enter key
    if (e.keyCode === 13) {
      const userInput = filteredSuggestions[activeAddress];
      this.setState({
        activeAddress: 0,
        showSuggestions: false,
        userInput: userInput
      });
      this.props.input.onChange(userInput);
    }
    // user pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeAddress === 0) {
        return;
      }
      this.setState({ activeAddress: activeAddress - 1 });
    }
    // user pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeAddress - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeAddress: activeAddress + 1 });
    }
  };

  render() {
    const {
      label,
      placeholder,
      id,
      input,
      type,
      icon,
      maxlength,
      disabled,
      meta: { touched, error }
    } = this.props;

    const classFormGroup = (touched && error && "form-group has-error") || "form-group";
    const classInputGroup = (icon && "input-group") || null;

    return (
      <React.Fragment>
        <div className={classFormGroup}>
          {label && (
            <label className="control-label" htmlFor={id}>
              {label}
            </label>
          )}
          <div className={classInputGroup}>
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
              placeholder={placeholder || label}
              maxLength={maxlength}
              disabled={disabled}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              autoComplete="off"
            />
          </div>
          {touched && error && (
            <span className="help-block" dangerouslySetInnerHTML={{ __html: error }} />
          )}
        </div>
        {this.state.showSuggestions && this.state.userInput && (
          <AddressListComponent
            activeAddress={this.state.activeAddress}
            filteredSuggestions={this.state.filteredSuggestions}
            onClick={this.onClick}
          />
        )}
      </React.Fragment>
    );
  }
}

const AddressListComponent = props => {
  return (
    <ul className="suggestions">
      {props.filteredSuggestions.map((suggestion, index) => {
        return (
          <li
            key={index}
            role="presentation"
            onClick={props.onClick}
            className={(index === props.activeAddress && "suggestion-active") || null}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  );
};

export default AddressComponent;
