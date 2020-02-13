import validator from "validator";

export const required = value => (value ? undefined : "Required");

export const email = value =>
  value && validator.isEmail(value) ? undefined : "Invalid <em>e.g. john@gmail.com</em>";

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const min8 = minLength(8);

export const passwordMatch = (value, allValues) =>
  value && validator.equals(value, allValues.password)
    ? undefined
    : "Confirm Password should match with Password";

export const phone = value => {
  const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return regex.test(value) ? undefined : "Invalid <em>e.g. +6422100200</em>";
};
