import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import initiateRoutes from "./routes";
import { TError } from "./interfaces/error";
import startServer from "./server";
require("dotenv").config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
initiateRoutes(app);

app.use((err: TError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.status || 500;
  let message = err.message || "Something went wrong";

  if (err?.code === "P2002") {
    const fields = err.meta?.target || "unknown field";
    message = `Duplicate entry for field(s): ${fields}`;
    statusCode = 409;
  }

  res.status(statusCode).json({ error: message });
});

startServer(app);
