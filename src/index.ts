import express from "express";
import cors from "cors";
import customerRoute from "./routes/customer.route";
import userRoute from "./routes/user.route";
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/customers", customerRoute);
app.use("/api/v1/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
