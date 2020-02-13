import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { RoutesComponent } from "../config";
import { HeaderContainer, FooterComponent } from "./home";

class App extends Component {
  render() {
    return (
      <div>
        <main role="main" className="container">
          <HeaderContainer />
          <RoutesComponent />
          <ToastContainer />
        </main>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
