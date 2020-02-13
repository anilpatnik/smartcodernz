// transpile all code following this line with babel and use 'env' (aka ES6) preset.
require("babel-register")({ presets: ["env"] });
require("babel-polyfill");
// import the rest of our application.
const functions = require("firebase-functions");
const server = require("./server.js");

exports.api = functions.https.onRequest(server);
