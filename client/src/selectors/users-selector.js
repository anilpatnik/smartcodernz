import { createSelector } from "reselect";
import _ from "lodash";
import { constants } from "../common";

export const getInitialValues = createSelector(
  state => state.read.users,
  users =>
    _.memoize(id => {
      const payload = users.payload;
      const user = payload ? _.find(payload, o => o.uid === id) : null;
      return {
        id: user ? id : constants.EMPTY_STRING,
        name: user ? user.displayName : constants.EMPTY_STRING,
        role: user ? user.role : constants.USER_ROLE
      };
    })
);
