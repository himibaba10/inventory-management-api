import { unitControllers } from "@/controllers/unit.controller";
import { Router } from "express";

const unitRoute = Router();

unitRoute.get("/", unitControllers.getUnits);
unitRoute.get("/:unitId", unitControllers.getUnit);

unitRoute.post("/", unitControllers.createUnit);

unitRoute.patch("/:unitId", unitControllers.updateUnit);

unitRoute.delete("/:unitId", unitControllers.deleteUnit);

export default unitRoute;
