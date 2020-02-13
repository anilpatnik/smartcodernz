import express from "express";
import { lookupController } from "../controllers";
const lookupRoute = express.Router();

lookupRoute.get("/countries", lookupController.getCountries);
lookupRoute.post("/countries", lookupController.submitCountries);

export default lookupRoute;
