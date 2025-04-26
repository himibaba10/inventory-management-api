import { userControllers } from "@/controllers/user.controller";
import { Router } from "express";

const userRoute = Router();

userRoute.get("/", userControllers.getUsers);
userRoute.get("/:userId", userControllers.getUser);

userRoute.post("/", userControllers.createUser);

userRoute.patch("/:userId", userControllers.updateUser);
userRoute.patch("/update-password/:userId", userControllers.updateUserPassword);

userRoute.delete("/:userId", userControllers.deleteUser);

export default userRoute;
