import { firebase } from "../config";
import { constants, axios } from "../common";

const urlAuth = `${constants.API_URL}${constants.AUTH_URL}`;
const urlSignIn = `${urlAuth}${constants.SIGN_IN_URL}`;
const urlProfile = `${urlAuth}${constants.PROFILE_URL}`;

// get user from firebase
export const getUser = async () => {
  const response = await axios.get(urlAuth);
  return response.json();
};

// Set Templates Action URL to https://app.firebaseapp.com?mode=<action>&oobCode=<code>
// create user with email and password in firebase
// send verification email
export const createUser = async item => {
  const user = await firebase.auth().createUserWithEmailAndPassword(item.email, item.password);
  await user.updateProfile({ displayName: item.name });
  return user.sendEmailVerification();
};

// login user with email and password against firebase
export const signIn = async item => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  const data = await firebase.auth().signInWithEmailAndPassword(item.email, item.password);
  const response = await axios.post(urlSignIn, data);
  return response.json();
};

// login user with Google against firebase
export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  // Add required scopes to access Google info if user allows while login
  // provider.addScope("https://www.googleapis.com/auth/user.addresses.read");
  // provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read");
  // provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
  // provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  const data = await firebase.auth().signInWithPopup(provider);
  const response = await axios.post(urlSignIn, data);
  return response.json();
};

// login user with Facebook against firebase
// go to https://developers.facebook.com/apps
// go to My Apps, create app and get APP ID and Client Token for Firebase Facebook Sign-in method
// set Facebook Valid OAuth Redirect URIs to https://app.firebaseapp.com/__/auth/handler
export const signInWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  // Add required scopes to access Facebook info if user allows while login
  // provider.addScope("user_address");
  // provider.addScope("user_mobile_phone");
  // provider.addScope("user_birthday");
  // provider.addScope("user_gender");
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  const data = await firebase.auth().signInWithPopup(provider);
  const response = await axios.post(urlSignIn, data);
  return response.json();
};

// logout user against firebase
export const signOut = () => firebase.auth().signOut();

// send a password reset email to a user from firebase
export const sendPasswordResetEmail = item => firebase.auth().sendPasswordResetEmail(item.email);

// email address verification in firebase
export const verifyEmail = code => firebase.auth().applyActionCode(code);

// email address verification for reset password in firebase
export const verifyPasswordReset = code => firebase.auth().verifyPasswordResetCode(code);

// reset the new password in firebase
export const confirmPasswordReset = (code, item) =>
  firebase.auth().confirmPasswordReset(code, item.password);

// update the new password in firebase
export const changePassword = async item => {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(user.email, item.currentpassword);
  await user.reauthenticateWithCredential(credential);
  return user.updatePassword(item.password);
};

// update name and photo url in firebase
export const changeProfile = async item => {
  const response = await axios.post(urlProfile, item);
  return response.json();
};
