import { merchantApi } from "../api";
import { constants, toaster } from "../common";
import * as funcs from "./action-functions";
import * as types from "./action-types";

export function findMerchants(item) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await merchantApi.findMerchants(item);
      if (data.status === constants.HTTP_200) {
        dispatch(funcs.FETCH_SUBMIT_FULFILLED(data.payload));
      } else {
        toaster(data.payload);
        dispatch(funcs.FETCH_SUBMIT_REJECTED());
      }
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}

export function resetFindMerchants() {
  return dispatch => {
    return dispatch({ type: `${types.FETCH_SUBMIT}_${types.RESET}` });
  };
}

export function getMerchants(data) {
  return async dispatch => {
    dispatch(funcs.FETCH_MERCHANTS_PENDING());
    try {
      return dispatch(funcs.FETCH_MERCHANTS_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_MERCHANTS_REJECTED());
    }
  };
}

export function resetGetMerchants() {
  return dispatch => {
    return dispatch({ type: `${types.FETCH_MERCHANTS}_${types.RESET}` });
  };
}

export function getMerchant(item) {
  return async dispatch => {
    try {
      dispatch(funcs.FETCH_MERCHANT_PENDING());
      const data = await merchantApi.getMerchant(item);
      if (data.status === constants.HTTP_200) {
        dispatch(funcs.FETCH_MERCHANT_FULFILLED(data.payload));
      } else {
        toaster(data.payload);
        dispatch(funcs.FETCH_MERCHANT_REJECTED());
      }
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_MERCHANT_REJECTED());
    }
  };
}
