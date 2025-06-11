import { Application } from "express";
import customerRoute from "./customer.route";
import userRoute from "./user.route";
import attendantRoute from "./attendant.route";
import shopRoute from "./shop.route";
import supplierRoute from "./supplier.route";
import unitRoute from "./unit.route";
import brandRoute from "./brand.route";
import categoryRoute from "./category.route";

const initiateRoutes = (app: Application) => {
  app.use("/api/v1/customers", customerRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/attendants", attendantRoute);
  app.use("/api/v1/shops", shopRoute);
  app.use("/api/v1/suppliers", supplierRoute);
  app.use("/api/v1/units", unitRoute);
  app.use("/api/v1/brands", brandRoute);
  app.use("/api/v1/categories", categoryRoute);
};

export default initiateRoutes;
