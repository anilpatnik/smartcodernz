import { usersApi } from "../api";
import { toaster, constants } from "../common";
import * as funcs from "./action-functions";

export function getUsers() {
  return async dispatch => {
    dispatch(funcs.FETCH_USERS_PENDING());
    try {
      const data = await usersApi.getUsers();
      return dispatch(funcs.FETCH_USERS_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_USERS_REJECTED());
    }
  };
}

export function submitUser(item) {
  return dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    return usersApi
      .submitCategory(item)
      .then(data => {
        toaster(constants.SUBMIT_SUCCESSFUL);
        dispatch(getUsers());
        dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
      })
      .catch(err => {
        toaster(err.message);
        dispatch(funcs.FETCH_SUBMIT_REJECTED());
      });
  };
}

export function deleteUser(item) {
  return dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    return usersApi
      .deleteCategory(item)
      .then(data => {
        toaster(constants.DELETE_SUCCESSFUL);
        dispatch(getUsers());
        dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
      })
      .catch(err => {
        toaster(err.message);
        dispatch(funcs.FETCH_SUBMIT_REJECTED());
      });
  };
}
