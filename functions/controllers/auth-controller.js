import { firebase, firestore } from "../config";
import { constants, authorize, helper } from "../common";
import { Auth } from "../models";

// get auth user from firebase users
export const getUser = async (req, res, next) => {
  const uid = helper.getIdfromToken(req);
  if (uid && uid.length > 0) {
    try {
      const user = await authorize.getUserById(uid);
      const userInfo = await authorize.getUserInfoById(uid);
      const emailVerified = userInfo.providerId !== constants.FACEBOOK ? user.emailVerified : true;
      const data = new Auth(
        user.displayName,
        user.email,
        userInfo.role,
        user.photoURL,
        emailVerified,
        userInfo.providerId,
        uid
      );
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }
};

// save auth user into firebase users
export const saveUser = async (req, res, next) => {
  const body = req.body;
  const providerId =
    (body.additionalUserInfo && body.additionalUserInfo.providerId) || constants.EMPTY_STRING;
  // google
  if (providerId === constants.GOOGLE) {
    try {
      const data = await setUser(constants.GOOGLE, body);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }
  // facebook
  if (providerId === constants.FACEBOOK) {
    try {
      const data = await setUser(constants.FACEBOOK, body);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }
  // password
  try {
    const data = await setUser(constants.PASSWORD, body);
    return res.json(data);
  } catch (err) {
    return next(err);
  }
};

// update firebase user for login
export const setUser = async (providerId, data) => {
  const uid = providerId === constants.PASSWORD ? data.uid : data.user.uid;
  const user = await authorize.getUserById(uid);
  const userInfo = await authorize.getUserInfoById(uid);
  const role = (userInfo && userInfo.role) || constants.USER_ROLE;
  const emailVerified = providerId !== constants.FACEBOOK ? user.emailVerified : true;
  await firestore
    .collection(constants.USERS_FB)
    .doc(uid)
    .set({ displayName: user.displayName, email: user.email, role, providerId });
  return new Auth(
    user.displayName,
    user.email,
    role,
    user.photoURL,
    emailVerified,
    providerId,
    uid
  );
};

// update firebase user profile (name,  photo)
export const updateUser = async (req, res, next) => {
  const body = req.body;
  try {
    const data = await firebase
      .auth()
      .updateUser(body.uid, { displayName: body.name, photoURL: body.photoURL });
    await firestore
      .collection(constants.USERS_FB)
      .doc(body.uid)
      .update({ displayName: body.name });
    return res.json(data);
  } catch (err) {
    return next(err);
  }
};
