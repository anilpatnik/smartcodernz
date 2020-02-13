import moment from "moment";
import { constants } from ".";

export default class helper {
  // get current date time - Jan 1, 2017 00:00:00 AM
  static get getDateTime() {
    return moment().format("ll LTS");
  }
  static getIdfromToken(req) {
    if (req.headers.authorization) {
      try {
        return req.headers.authorization.split(" ")[1];
      } catch (err) {
        return constants.EMPTY_STRING;
      }
    }
    return constants.EMPTY_STRING;
  }
}
