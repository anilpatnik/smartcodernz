import _ from "lodash";
import { firebase, firestore } from "../config";
import { constants, authorize } from "../common";
import { User } from "../models";

// get data from firebase
export const getUsers = async (req, res, next) => {
  try {
    const authorized = await authorize.getAuthorization(req, [constants.SUPER_ADMIN_ROLE]);
    if (authorized) {
      const data = await firebase.auth().listUsers();
      if (data && data.users) {
        const users = await Promise.all(
          _.map(data.users, async (value, key) => {
            const user = await authorize.getUserInfoById(value.uid);
            const role = (user && user.role) || constants.EMPTY_STRING;
            const providers = _.map(value.providerData, (value, key) => value.providerId);
            return new User(
              value.displayName,
              value.email,
              role,
              value.photoURL,
              value.metadata.creationTime,
              value.metadata.lastSignInTime,
              providers,
              value.uid
            );
          })
        );
        return res.json(users);
      }
      return res.json(data);
    }
    return res.status(400).json(constants.HTTP_400);
  } catch (err) {
    return next(err);
  }
};

// add or update data to firebase
export const submitUser = async (req, res, next) => {
  try {
    const authorized = await authorize.getAuthorization(req, [constants.SUPER_ADMIN_ROLE]);
    if (authorized) {
      const body = req.body;
      return res.json(
        firestore
          .collection(constants.USERS_FB)
          .doc(body.id)
          .update({ role: body.role })
      );
    }
    return res.status(400).json(constants.HTTP_400);
  } catch (err) {
    return next(err);
  }
};

// delete data from firebase
export const deleteUser = async (req, res, next) => {
  try {
    const authorized = await authorize.getAuthorization(req, [constants.SUPER_ADMIN_ROLE]);
    if (authorized) {
      return res.json(
        firestore
          .collection(constants.USERS_FB)
          .doc(req.params.id)
          .delete()
          .then(() => firebase.auth().deleteUser(req.params.id))
      );
    }
    return res.status(400).json(constants.HTTP_400);
  } catch (err) {
    return next(err);
  }
};
