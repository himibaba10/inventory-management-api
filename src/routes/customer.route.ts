import { customerControllers } from "@/controllers/customer.controller";
import { Router } from "express";

const customerRoute = Router();

customerRoute.get("/", customerControllers.getCustomers);
customerRoute.get("/:supplierId", customerControllers.getCustomer);

customerRoute.post("/", customerControllers.createCustomer);

customerRoute.patch("/:supplierId", customerControllers.updateCustomer);

customerRoute.delete("/:supplierId", customerControllers.deleteCustomer);

export default customerRoute;
