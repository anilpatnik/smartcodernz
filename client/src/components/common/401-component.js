import React, { Component } from "react";

class UnAuthorizedComponent extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="page-header">401 Unauthorized</h3>
        <p>We are sorry but you are not authorized to view this page.</p>
      </div>
    );
  }
}

export default UnAuthorizedComponent;
