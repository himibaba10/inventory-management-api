import { brandControllers } from "@/controllers/brand.controller";
import { Router } from "express";

const brandRoute = Router();

brandRoute.get("/", brandControllers.getBrands);
brandRoute.get("/:brandId", brandControllers.getBrand);

brandRoute.post("/", brandControllers.createBrand);

brandRoute.patch("/:brandId", brandControllers.updateBrand);

brandRoute.delete("/:brandId", brandControllers.deleteBrand);

export default brandRoute;
