import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { actionTypes } from "../actions";
import { constants } from "../common";
import genericReducer from "./generic-reducer";
import authReducer from "./auth-reducer";

// get reducer
const readReducer = combineReducers({
  auth: authReducer,
  users: genericReducer(actionTypes.FETCH_USERS),
  recaptcha: genericReducer(actionTypes.FETCH_RECAPTCHA),
  categories: genericReducer(actionTypes.FETCH_CATEGORIES),
  countries: genericReducer(actionTypes.FETCH_COUNTRIES),
  merchants: genericReducer(actionTypes.FETCH_MERCHANTS),
  merchant: genericReducer(actionTypes.FETCH_MERCHANT)
});

// post reducer
const writeReducer = combineReducers({
  submit: genericReducer(actionTypes.FETCH_SUBMIT)
});

// app reducer
const appReducer = combineReducers({
  form: formReducer,
  write: writeReducer,
  read: readReducer
});

// root reducer
const rootReducer = (state, action) => {
  // clear read and write store after sign-out
  if (action.type === actionTypes.SIGN_OUT) {
    state.write = constants.EMPTY_OBJECT;
    state.read = constants.EMPTY_OBJECT;
  }
  return appReducer(state, action);
};

export default rootReducer;
