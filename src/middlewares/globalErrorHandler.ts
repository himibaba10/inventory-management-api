import { TError } from "@/interfaces/error";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: TError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.status || 500;
  let message = err.message || "Something went wrong";

  if (err?.code === "P2002") {
    const fields = err.meta?.target || "unknown field";
    message = `Duplicate entry for field(s): ${fields}`;
    statusCode = 409;
  }

  res.status(statusCode).json({ error: message });
};

export default globalErrorHandler;
