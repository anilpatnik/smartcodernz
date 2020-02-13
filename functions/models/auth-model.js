import { constants } from "../common";

export default class Auth {
  constructor(
    displayName = constants.EMPTY_STRING,
    email = constants.EMPTY_STRING,
    role = constants.EMPTY_STRING,
    photoURL = constants.EMPTY_STRING,
    isAuthenticated = false,
    providerId = constants.EMPTY_STRING,
    uid = constants.EMPTY_STRING
  ) {
    this.displayName = displayName;
    this.email = email;
    this.role = role;
    this.photoURL = photoURL;
    this.isAuthenticated = isAuthenticated;
    this.providerId = providerId;
    this.uid = uid;
  }
}
