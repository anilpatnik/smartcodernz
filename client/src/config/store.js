import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import promise from "redux-promise-middleware";
import rootReducer from "../reducers";
import { constants } from "../common";

// log - collapsed for non errors
const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});

// log for development only
let middleware = [promise(), thunk];
if (process.env.NODE_ENV !== constants.PRODUCTION) {
  middleware = [...middleware, logger];
}

// store config
function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      process.env.NODE_ENV !== constants.PRODUCTION && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
}

export const store = configureStore();
