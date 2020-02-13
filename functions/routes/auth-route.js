import express from "express";
import { authController } from "../controllers";
const authRoute = express.Router();

authRoute.get("/", authController.getUser);
authRoute.post("/signin", authController.saveUser);
authRoute.post("/profile", authController.updateUser);

export default authRoute;
