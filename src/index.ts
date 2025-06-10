import express from "express";
import initiateRoutes from "./routes";
import startServer from "./server";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import initiateMiddlewares from "./middlewares";
import handleSyncAsyncError from "./middlewares/handleSyncAsyncError";
require("dotenv").config();
handleSyncAsyncError();

const app = express();

// Middlewares
initiateMiddlewares(app);

// Routes
initiateRoutes(app);

app.use(globalErrorHandler);

const bootstrap = async () => {
  try {
    // Connect to database or run other async setups here (optional)

    startServer(app);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

bootstrap();
