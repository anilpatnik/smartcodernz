import { categoriesApi } from "../api";
import { toaster, constants } from "../common";
import * as funcs from "./action-functions";

export function getCategories() {
  return async dispatch => {
    dispatch(funcs.FETCH_CATEGORIES_PENDING());
    try {
      const data = await categoriesApi.getCategories();
      return dispatch(funcs.FETCH_CATEGORIES_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_CATEGORIES_REJECTED());
    }
  };
}

export function submitCategory(item) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await categoriesApi.submitCategory(item);
      toaster(constants.SUBMIT_SUCCESSFUL);
      dispatch(getCategories());
      dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}

export function deleteCategory(item) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await categoriesApi.deleteCategory(item);
      toaster(constants.DELETE_SUCCESSFUL);
      dispatch(getCategories());
      dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}
