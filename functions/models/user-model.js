import { constants } from "../common";
import moment from "moment";

export default class User {
  constructor(
    displayName = constants.EMPTY_STRING,
    email = constants.EMPTY_STRING,
    role = constants.EMPTY_STRING,
    photoURL = constants.EMPTY_STRING,
    creationTime = constants.EMPTY_STRING,
    lastSignInTime = constants.EMPTY_STRING,
    providers = constants.EMPTY_ARRAY,
    uid = constants.EMPTY_STRING
  ) {
    this.displayName = displayName;
    this.email = email;
    this.role = role;
    this.photoURL = photoURL;
    this.creationTime = moment
      .utc(creationTime)
      .local()
      .format("DD MMM YYYY HH:mm:ss");
    this.lastSignInTime = moment
      .utc(lastSignInTime)
      .local()
      .format("DD MMM YYYY HH:mm:ss");
    this.providers = providers;
    this.uid = uid;
  }
}
