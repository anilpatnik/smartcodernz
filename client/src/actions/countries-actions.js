import { countriesApi } from "../api";
import { toaster, constants } from "../common";
import * as funcs from "./action-functions";

export function getCountries() {
  return async dispatch => {
    dispatch(funcs.FETCH_COUNTRIES_PENDING());
    try {
      const data = await countriesApi.getCountries();
      return dispatch(funcs.FETCH_COUNTRIES_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_COUNTRIES_REJECTED());
    }
  };
}

export function loadCountries() {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await countriesApi.loadCountries();
      toaster(constants.SUBMIT_SUCCESSFUL);
      dispatch(getCountries());
      dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}
