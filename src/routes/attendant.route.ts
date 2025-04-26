import { userControllers } from "@/controllers/user.controller";
import { Router } from "express";

const attendantRoute = Router();

attendantRoute.get("/", userControllers.getAttendants);

export default attendantRoute;
