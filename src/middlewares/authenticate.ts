import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    return next(createHttpError(401, "Access denied. No token provided."));
  }
  try {
    const parsedToken = token.split(" ")[1];
    const decoded = verify(parsedToken, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const _req = req as AuthRequest;
    _req.userId = decoded.id;

    next();
  } catch (err) {
    console.error("Token Verification Error:", err);
    return next(createHttpError(401, "Invalid or expired token"));
  }
};

export default authenticate;
