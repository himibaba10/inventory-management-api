import { TError } from "@/interfaces/error";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: TError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Came in the global error");
  let statusCode = err.status || 500;
  let message = err.message || "Something went wrong";

  if (err?.code === "P2002") {
    const fields = err.meta?.target || "unknown field";
    message = `Duplicate entry for field(s): ${fields}`;
    statusCode = 409;
  }

  if (err?.code === "P2025") {
    const fields = err.meta?.modelName || "unknown field";
    message = `Record to update not found for: ${fields}`;
    statusCode = 404;
  }

  res.status(statusCode).json({ error: message });
};

export default globalErrorHandler;
