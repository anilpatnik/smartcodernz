import firebase from "firebase";
import { constants } from "../common";

// TEST
const TEST = {};

// PROD
const PROD = {};

const config =
  window.location.origin.toLowerCase() === constants.SITE_URL.toLowerCase() ? PROD : TEST;
firebase.initializeApp(config);

export default firebase;
