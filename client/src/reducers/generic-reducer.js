import { actionTypes } from "../actions";

const initialState = {
  payload: {},
  isLoading: false,
  isSuccess: false,
  isError: false
};

export default function higherOrderReducer(type, model) {
  const initialPayload = model || {};
  return function genericReducer(state = { ...initialState, payload: initialPayload }, action) {
    const payload = action.payload || initialPayload;
    switch (action.type) {
      case `${type}_${actionTypes.PENDING}`:
        return {
          ...initialState,
          isLoading: true,
          payload: payload
        };
      case `${type}_${actionTypes.FULFILLED}`:
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          payload: payload
        };
      case `${type}_${actionTypes.REJECTED}`:
        return {
          ...state,
          isLoading: false,
          isError: true,
          payload: payload
        };
      case `${type}_${actionTypes.RESET}`:
        return initialState;
      default:
        return state;
    }
  };
}
