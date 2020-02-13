import * as types from "./action-types";

export function getReCaptcha(payload) {
  return dispatch => {
    dispatch({ type: `${types.FETCH_RECAPTCHA}_${types.PENDING}` });
    if (payload) {
      return dispatch({ type: `${types.FETCH_RECAPTCHA}_${types.FULFILLED}`, payload: payload });
    } else {
      dispatch({ type: `${types.FETCH_RECAPTCHA}_${types.REJECTED}` });
    }
  };
}

export function resetReCaptcha() {
  return dispatch => {
    return dispatch({ type: `${types.FETCH_RECAPTCHA}_${types.RESET}` });
  };
}
