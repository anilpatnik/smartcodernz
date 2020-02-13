import React, { Component } from "react";
import moment from "moment";

class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">smartcodernz &copy; {moment().format("YYYY")}</p>
        </div>
      </footer>
    );
  }
}

export default FooterComponent;
