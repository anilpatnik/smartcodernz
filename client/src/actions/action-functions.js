import * as types from "./action-types";

export function FETCH_SUBMIT_PENDING() {
  return { type: types.FETCH_SUBMIT_PENDING };
}
export function FETCH_SUBMIT_FULFILLED(data) {
  return { type: types.FETCH_SUBMIT_FULFILLED, payload: data };
}
export function FETCH_SUBMIT_REJECTED() {
  return { type: types.FETCH_SUBMIT_REJECTED };
}

export function SIGN_OUT() {
  return { type: types.SIGN_OUT };
}

export function FETCH_AUTH_PENDING() {
  return { type: types.FETCH_AUTH_PENDING };
}
export function FETCH_AUTH_FULFILLED(data) {
  return { type: types.FETCH_AUTH_FULFILLED, payload: data };
}
export function FETCH_AUTH_REJECTED() {
  return { type: types.FETCH_AUTH_REJECTED };
}

export function FETCH_USERS_PENDING() {
  return { type: types.FETCH_USERS_PENDING };
}
export function FETCH_USERS_FULFILLED(data) {
  return { type: types.FETCH_USERS_FULFILLED, payload: data };
}
export function FETCH_USERS_REJECTED() {
  return { type: types.FETCH_USERS_REJECTED };
}

export function FETCH_CATEGORIES_PENDING() {
  return { type: types.FETCH_CATEGORIES_PENDING };
}
export function FETCH_CATEGORIES_FULFILLED(data) {
  return { type: types.FETCH_CATEGORIES_FULFILLED, payload: data };
}
export function FETCH_CATEGORIES_REJECTED() {
  return { type: types.FETCH_CATEGORIES_REJECTED };
}

export function FETCH_COUNTRIES_PENDING() {
  return { type: types.FETCH_COUNTRIES_PENDING };
}
export function FETCH_COUNTRIES_FULFILLED(data) {
  return { type: types.FETCH_COUNTRIES_FULFILLED, payload: data };
}
export function FETCH_COUNTRIES_REJECTED() {
  return { type: types.FETCH_COUNTRIES_REJECTED };
}

export function FETCH_MERCHANTS_PENDING() {
  return { type: types.FETCH_MERCHANTS_PENDING };
}
export function FETCH_MERCHANTS_FULFILLED(data) {
  return { type: types.FETCH_MERCHANTS_FULFILLED, payload: data };
}
export function FETCH_MERCHANTS_REJECTED() {
  return { type: types.FETCH_MERCHANTS_REJECTED };
}

export function FETCH_MERCHANT_PENDING() {
  return { type: types.FETCH_MERCHANT_PENDING };
}
export function FETCH_MERCHANT_FULFILLED(data) {
  return { type: types.FETCH_MERCHANT_FULFILLED, payload: data };
}
export function FETCH_MERCHANT_REJECTED() {
  return { type: types.FETCH_MERCHANT_REJECTED };
}
