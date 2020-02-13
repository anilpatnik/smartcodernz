import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import { errorHandler } from "./common";
const server = express();

// allows access from any origin
server.use(cors());
// for parsing application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
server.use(bodyParser.json());
// api routes
server.use("/api", routes);
// api error handler
server.use(errorHandler);

module.exports = server;
