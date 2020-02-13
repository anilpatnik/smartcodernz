import express from "express";
import { userController } from "../controllers";
const userRoute = express.Router();

userRoute.get("/", userController.getUsers);
userRoute.post("/", userController.submitUser);
userRoute.delete("/:id", userController.deleteUser);

export default userRoute;
