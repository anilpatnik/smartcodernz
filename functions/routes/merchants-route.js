import express from "express";
import { merchantsController } from "../controllers";
const merchantsRoute = express.Router();

merchantsRoute.post("/", merchantsController.findMerchants);
merchantsRoute.post("/:id", merchantsController.getMerchant);

export default merchantsRoute;
