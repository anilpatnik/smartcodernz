import { authApi } from "../api";
import { toaster, constants } from "../common";
import * as funcs from "./action-functions";

// call firebase api to get user
export function getUser() {
  return async dispatch => {
    dispatch(funcs.FETCH_AUTH_PENDING());
    try {
      const data = await authApi.getUser();
      dispatch(funcs.FETCH_AUTH_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_AUTH_REJECTED());
    }
  };
}

// call firebase api to create user with email and password
export function createUser(item) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await authApi.createUser(item);
      dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
      // clear sessionStorage
      sessionStorage.clear();
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}

// call firebase api to login user with email and password
export function signIn(item) {
  return async dispatch => {
    dispatch(funcs.FETCH_AUTH_PENDING());
    try {
      const data = await authApi.signIn(item);
      if (!data.isAuthenticated) {
        toaster("Please verify your email address.");
      }
      dispatch(funcs.FETCH_AUTH_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_AUTH_REJECTED());
    }
  };
}

// call firebase api to login user with google
export function signInWithGoogle() {
  return async dispatch => {
    dispatch(funcs.FETCH_AUTH_PENDING());
    try {
      const data = await authApi.signInWithGoogle();
      return dispatch(funcs.FETCH_AUTH_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_AUTH_REJECTED());
    }
  };
}

// call firebase api to login user with facebook
export function signInWithFacebook() {
  return async dispatch => {
    dispatch(funcs.FETCH_AUTH_PENDING());
    try {
      const data = await authApi.signInWithFacebook();
      return dispatch(funcs.FETCH_AUTH_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_AUTH_REJECTED());
    }
  };
}

// call firebase api to logout user
export function signOut() {
  return async dispatch => {
    dispatch(funcs.FETCH_AUTH_PENDING());
    try {
      await authApi.signOut();
      setTimeout(() => {
        // clear sessionStorage
        sessionStorage.clear();
        // clear auth reducer
        dispatch(funcs.FETCH_AUTH_FULFILLED(constants.EMPTY_OBJECT));
        // clear redux store
        dispatch(funcs.SIGN_OUT());
      }, 1000);
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_AUTH_REJECTED());
    }
  };
}

// call firebase api to send a password reset email to a user
export function sendPasswordResetEmail(item) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await authApi.sendPasswordResetEmail(item);
      dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}

// call firebase api for email address verification
export function verifyEmail(code) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await authApi.verifyEmail(code);
      dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}

// call firebase api to verify email address for reset password
export function verifyPasswordReset(code) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await authApi.verifyPasswordReset(code);
      dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}

// call firebase api to reset password
export function confirmPasswordReset(code, item) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await authApi.confirmPasswordReset(code, item);
      dispatch(signIn(item));
      dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(verifyPasswordReset(code));
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}

// call firebase api to change password
export function changePassword(item) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      const data = await authApi.changePassword(item);
      toaster("Password has been changed successfully. Please re-login and verify the changes.");
      dispatch(funcs.FETCH_SUBMIT_FULFILLED(data));
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}

// call firebase api to update profile
export function changeProfile(item) {
  return async dispatch => {
    dispatch(funcs.FETCH_SUBMIT_PENDING());
    try {
      await authApi.changeProfile(item);
      toaster("Profile has been updated successfully.");
      dispatch(getUser());
      dispatch(funcs.FETCH_SUBMIT_FULFILLED());
    } catch (err) {
      toaster(err.message);
      dispatch(funcs.FETCH_SUBMIT_REJECTED());
    }
  };
}
