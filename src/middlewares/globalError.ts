import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
function globalError() {
  const env = require("dotenv").config();
  (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
      message: err.message || "Internal Server Error",

      errorStack: env.NODE_ENV !== "production" ? err.stack : undefined,
    });
  };
}

export default globalError;
