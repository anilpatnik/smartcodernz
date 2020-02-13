import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/loading.css";
import "./styles/styles.css";
import { store } from "./config/store";
import { helper } from "./common";
import { authActions } from "./actions";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";

// update store for current user
if (helper.getSessionUserId && helper.getSessionUserId.length > 0) {
  store.dispatch(authActions.getUser());
}

// render application
render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
