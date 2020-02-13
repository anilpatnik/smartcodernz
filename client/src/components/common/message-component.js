import React, { Component } from "react";
import PropTypes from "prop-types";
import InnerHtmlComponent from "./inner-html-component";

class MessageComponent extends Component {
  render() {
    const { header, text, color } = this.props;
    return (
      <div className="container">
        <div className="col-sm-10 col-sm-offset-1 text-center well">
          <h4 className={`mb20 ${color}`}>
            <InnerHtmlComponent text={header} />
          </h4>
          <InnerHtmlComponent text={text} />
        </div>
      </div>
    );
  }
}

MessageComponent.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default MessageComponent;
