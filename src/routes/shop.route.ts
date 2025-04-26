import { shopControllers } from "@/controllers/shop.controller";
import { Router } from "express";

const shopRoute = Router();

shopRoute.post("/", shopControllers.createShop);

export default shopRoute;
