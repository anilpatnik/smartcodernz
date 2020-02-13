import express from "express";
import { categoryController } from "../controllers";
const categoryRoute = express.Router();

categoryRoute.get("/", categoryController.getCategories);
categoryRoute.post("/", categoryController.submitCategory);
categoryRoute.delete("/:id", categoryController.deleteCategory);

export default categoryRoute;
