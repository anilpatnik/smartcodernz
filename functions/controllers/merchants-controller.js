import _ from "lodash";
import * as functions from "firebase-functions";
import { constants, authorize } from "../common";

const envType = (functions.config().env && functions.config().env.type) || constants.EMPTY_STRING;
const googleMapsClient = require(constants.GOOGLE_MAPS).createClient({
  key: envType === constants.PRODUCTION ? constants.PROD_API_KEY : constants.TEST_API_KEY,
  timeout: 10000,
  Promise: Promise
});

// find merchant from google place search
export const findMerchants = async (req, res, next) => {
  try {
    const authorized = await authorize.getAuthorization(req, [
      constants.MERCHANT_ROLE,
      constants.ADMIN_ROLE,
      constants.SUPER_ADMIN_ROLE
    ]);
    if (authorized) {
      const body = req.body;
      const query = body.token
        ? { pagetoken: body.token, region: constants.NZ }
        : { query: body.name, region: constants.NZ };
      const response = await googleMapsClient.places(query).asPromise();
      return res.json({ status: constants.HTTP_200, payload: response.json });
    }
  } catch (err) {
    if (err.json) {
      res.json({ status: constants.HTTP_400, payload: err.json.error_message });
    } else {
      res.json({ status: constants.HTTP_400, payload: err });
    }
    return next(err);
  }
};

// get merchant from google place details
export const getMerchant = async (req, res, next) => {
  try {
    const authorized = await authorize.getAuthorization(req, [
      constants.MERCHANT_ROLE,
      constants.ADMIN_ROLE,
      constants.SUPER_ADMIN_ROLE
    ]);
    if (authorized) {
      const body = req.body;
      const response = await googleMapsClient
        .place({ placeid: body.id, sessiontoken: body.value, language: "en" })
        .asPromise();
      return res.json({ status: constants.HTTP_200, payload: response.json });
    }
  } catch (err) {
    if (err.json) {
      res.json({ status: constants.HTTP_400, payload: err.json.error_message });
    } else {
      res.json({ status: constants.HTTP_400, payload: err });
    }
    return next(err);
  }
};
