import { userControllers } from "@/controllers/user.controller";
import { Router } from "express";

const userRoute = Router();

userRoute.get("/", userControllers.getUsers);
userRoute.get("/:userId", userControllers.getUser);

userRoute.post("/", userControllers.createUser);

// userRoute.patch("/:customerId", customerControllers.updateUser);

// userRoute.delete("/:customerId", customerControllers.deleteUser);

export default userRoute;
