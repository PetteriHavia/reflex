import { NextFunction, Request, Response } from "express";

interface ErrorHandlerError extends Error {
  statusCode?: number;
  status?: string;
}

export function errorHandler(
  error: ErrorHandlerError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.status || "error",
    message: error.message,
  });
}
