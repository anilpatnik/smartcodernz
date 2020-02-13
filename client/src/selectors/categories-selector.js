import { createSelector } from "reselect";
import _ from "lodash";
import { constants } from "../common";

export const getInitialValues = createSelector(
  state => state.read.categories,
  categories =>
    _.memoize(id => {
      const payload = categories.payload;
      const category = payload ? _.find(payload, o => o.id === id) : null;
      return {
        id: category ? id : null,
        name: category ? category.name : constants.EMPTY_STRING,
        active: category ? category.active : true
      };
    })
);
