import { constants } from "../common";
import moment from "moment";

export default class Lookup {
  constructor(
    id = constants.EMPTY_STRING,
    name = constants.EMPTY_STRING,
    active = false,
    updated = constants.EMPTY_STRING
  ) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.updated = moment(updated.toDate()).format("ll LTS");
  }
}
