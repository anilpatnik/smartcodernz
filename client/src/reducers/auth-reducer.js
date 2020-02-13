import { actionTypes } from "../actions";
import { Auth } from "../models";

const initialState = {
  user: new Auth(),
  isLoading: false,
  isSuccess: false,
  isError: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AUTH_PENDING:
      return {
        ...initialState,
        isLoading: true
      };
    case actionTypes.FETCH_AUTH_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload || new Auth()
      };
    case actionTypes.FETCH_AUTH_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}
