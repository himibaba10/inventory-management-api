import express from "express";
import cors from "cors";
import customerRoute from "./routes/customer.route";
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/customers", customerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
