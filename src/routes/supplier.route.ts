import { supplierControllers } from "@/controllers/supplier.controller";
import { Router } from "express";

const supplierRoute = Router();

supplierRoute.get("/", supplierControllers.getSuppliers);
supplierRoute.get("/:supplierId", supplierControllers.getSupplier);

supplierRoute.post("/", supplierControllers.createSupplier);

supplierRoute.patch("/:supplierId", supplierControllers.updateSupplier);

supplierRoute.delete("/:supplierId", supplierControllers.deleteSupplier);

export default supplierRoute;
