import { categoryControllers } from "@/controllers/category.controller";
import { Router } from "express";

const categoryRoute = Router();

categoryRoute.get("/", categoryControllers.getCategories);
categoryRoute.get("/:categoryId", categoryControllers.getCategory);

categoryRoute.post("/", categoryControllers.createCategory);

categoryRoute.patch("/:categoryId", categoryControllers.updateCategory);

categoryRoute.delete("/:categoryId", categoryControllers.deleteCategory);

export default categoryRoute;
