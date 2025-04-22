import { userControllers } from "@/controllers/user.controller";
import { Router } from "express";

const userRoute = Router();

// userRoute.get("/", customerControllers.getUsers);
// userRoute.get("/:customerId", customerControllers.getUser);

userRoute.post("/", userControllers.createUser);

// userRoute.patch("/:customerId", customerControllers.updateUser);

// userRoute.delete("/:customerId", customerControllers.deleteUser);

export default userRoute;
