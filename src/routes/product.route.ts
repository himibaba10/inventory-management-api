import { productControllers } from "@/controllers/product.controller";
import { Router } from "express";

const productRoute = Router();

productRoute.get("/", productControllers.getProducts);
productRoute.get("/:productId", productControllers.getProduct);

productRoute.post("/", productControllers.createProduct);

productRoute.patch("/:productId", productControllers.updateProduct);

productRoute.delete("/:productId", productControllers.deleteProduct);

export default productRoute;
