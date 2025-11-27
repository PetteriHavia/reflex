import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../utils/db";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: any;
    }
  }
}

export const tokenExtractor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("bearer ")) {
    req.token = authorization.replace("bearer ", "");
  }
  next();
};

export const userExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.token) {
      if (!process.env.SECRET) {
        return res.status(500).json({ message: "Token secret not configured" });
      }
      const decodeToken = jwt.verify(
        req.token,
        process.env.SECRET as string
      ) as { id: number };
      if (!decodeToken.id) {
        return res.status(401).json({ message: "Invalid token" });
      }
      const user = await pool.query(
        "SELECT id, username, email FROM users WHERE id=$1",
        [decodeToken.id]
      );

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      req.user = user.rows[0];
    }
  } catch (err) {
    next(err);
  }
};
