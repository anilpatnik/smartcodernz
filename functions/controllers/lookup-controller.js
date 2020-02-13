import _ from "lodash";
import { firestore } from "../config";
import { constants, authorize, axios, helper } from "../common";
import { Lookup } from "../models";

const urlCountries = "http://country.io/names.json";

// get data from firebase
export const getCountries = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection(constants.COUNTRIES_FB).get();
    const data = _.map(snapshot.docs, doc => _.extend({ id: doc.id }, doc.data()));
    const countries = _.map(data, country => {
      return new Lookup(country.id, country.name, country.active, country.updated);
    });
    return res.json(countries);
  } catch (err) {
    return next(err);
  }
};

// add or update data to firebase
export const submitCountries = async (req, res, next) => {
  try {
    const authorized = await authorize.getAuthorization(req, [constants.SUPER_ADMIN_ROLE]);
    if (authorized) {
      const response = await axios.get(urlCountries).then(data => data.json());
      const snapshot = await firestore.collection(constants.COUNTRIES_FB).get();
      const countries = _.map(snapshot.docs, doc => _.extend({ id: doc.id }, doc.data()));
      if (response) {
        const ascCountries = _.sortBy(response);
        _.map(ascCountries, (v, k) => {
          const country = _.find(countries, x => x.name === v);
          if (!country) {
            firestore
              .collection(constants.COUNTRIES_FB)
              .doc()
              .set({ name: v, active: true, updated: new Date(helper.getDateTime) });
          } else {
            firestore
              .collection(constants.COUNTRIES_FB)
              .doc(country.id)
              .set({ name: v, active: true, updated: new Date(helper.getDateTime) });
          }
        });
        return res.status(200).json(constants.HTTP_200);
      }
    }
    return res.status(400).json(constants.HTTP_400);
  } catch (err) {
    return next(err);
  }
};
