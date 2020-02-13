import _ from "lodash";
import { firestore } from "../config";
import { constants, authorize, helper } from "../common";
import { Lookup } from "../models";

// get data from firebase
export const getCategories = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection(constants.CATEGORIES_FB).get();
    const data = _.map(snapshot.docs, doc => _.extend({ id: doc.id }, doc.data()));
    const categories = _.map(data, category => {
      return new Lookup(category.id, category.name, category.active, category.updated);
    });
    return res.json(categories);
  } catch (err) {
    return next(err);
  }
};

// add or update data to firebase
export const submitCategory = async (req, res, next) => {
  try {
    const authorized = await authorize.getAuthorization(req, [constants.SUPER_ADMIN_ROLE]);
    if (authorized) {
      const body = req.body;
      const id = body.id;
      if (!id) {
        return res.json(
          firestore
            .collection(constants.CATEGORIES_FB)
            .doc()
            .set({
              name: body.name,
              active: body.active,
              updated: new Date(helper.getDateTime)
            })
        );
      }
      return res.json(
        firestore
          .collection(constants.CATEGORIES_FB)
          .doc(id)
          .set({
            name: body.name,
            active: body.active,
            updated: new Date(helper.getDateTime)
          })
      );
    }
    return res.status(400).json(constants.HTTP_400);
  } catch (err) {
    return next(err);
  }
};

// delete data from firebase
export const deleteCategory = async (req, res, next) => {
  try {
    const authorized = await authorize.getAuthorization(req, [constants.SUPER_ADMIN_ROLE]);
    if (authorized) {
      return res.json(
        firestore
          .collection(constants.CATEGORIES_FB)
          .doc(req.params.id)
          .delete()
      );
    }
    return res.status(400).json(constants.HTTP_400);
  } catch (err) {
    return next(err);
  }
};
