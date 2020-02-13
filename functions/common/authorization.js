import { firebase, firestore } from "../config";
import { constants, helper } from ".";

// create token for auth user
export const createToken = uid => firebase.auth().createCustomToken(uid);

// verify token and return uid for auth user
export const verifyToken = idToken => firebase.auth().verifyIdToken(idToken);

// get user from uid
export const getUserById = uid => firebase.auth().getUser(uid);

// get firebase user by uid
export const getUserInfoById = async uid => {
  const doc = await firestore
    .collection(constants.USERS_FB)
    .doc(uid)
    .get();
  return doc.data();
};

// get user from email
export const getUserByEmail = email => firebase.auth().getUserByEmail(email);

// get user from phone number
export const getUserByPhoneNumber = phone => firebase.auth().getUserByPhoneNumber(phone);

// get authorization to access api
export const getAuthorization = async (req, roles) => {
  try {
    const uid = helper.getIdfromToken(req);
    if (uid && uid.length > 0) {
      const userInfo = await getUserInfoById(uid);
      return roles.some(role => role.toUpperCase() === userInfo.role.toUpperCase());
    }
  } catch (err) {
    return false;
  }
  return false;
};
