import { shopControllers } from "@/controllers/shop.controller";
import { Router } from "express";

const shopRoute = Router();

shopRoute.get("/", shopControllers.getShops);
shopRoute.get("/:shopId", shopControllers.getShop);
shopRoute.get("/:shopId/attendants", shopControllers.getShopAttendants);

shopRoute.post("/", shopControllers.createShop);
shopRoute.post(
  "/:shopId/attendants/:attendantId",
  shopControllers.addShopAttendant
);

export default shopRoute;
