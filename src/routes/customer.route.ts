import { customerControllers } from "@/controllers/customer.controller";
import { Router } from "express";

const customerRoute = Router();

customerRoute.get("/", customerControllers.getCustomers);
customerRoute.get("/:customerId", customerControllers.getCustomer);

customerRoute.post("/", customerControllers.createCustomer);

customerRoute.patch("/:customerId", customerControllers.updateCustomer);

customerRoute.delete("/:customerId", customerControllers.deleteCustomer);

export default customerRoute;
