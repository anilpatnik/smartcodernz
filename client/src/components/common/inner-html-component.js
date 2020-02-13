import React, { Component } from "react";
import PropTypes from "prop-types";

class InnerHtmlComponent extends Component {
  render() {
    const { text } = this.props;
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  }
}

InnerHtmlComponent.propTypes = {
  text: PropTypes.string.isRequired
};

export default InnerHtmlComponent;
