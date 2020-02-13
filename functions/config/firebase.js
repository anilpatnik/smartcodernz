import firebase from "firebase-admin";
import * as functions from "firebase-functions";
import { constants } from "../common";
import serviceAccountTest from "./serviceAccountTest.json";
import serviceAccount from "./serviceAccount.json";

// access non admin auth functions
// const functions = require("firebase-functions");
// firebase.initializeApp(functions.config().firebase);

// credential implementation provided to initializeApp() via the "credential"
// property has insufficient permission to access the requested resource
// access admin auth functions

// TEST
const TEST = {
  credential: firebase.credential.cert(serviceAccountTest),
  databaseURL: "https://smartcodernz.firebaseio.com"
};

// PROD
const PROD = {
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://smartcodernz.firebaseio.com"
};

const envType = (functions.config().env && functions.config().env.type) || constants.EMPTY_STRING;
const config = envType === constants.PRODUCTION ? PROD : TEST;
firebase.initializeApp(config);

// const auth = firebase.auth();
// const rtdb = firebase.database();
const firestore = firebase.firestore();

// https://firebase.google.com/docs/reference/js/firebase.firestore.Settings
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export { firebase, firestore };
