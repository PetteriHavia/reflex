import { Router, Request, Response } from "express";
import pool from "../utils/db";

const userRouter = Router();

userRouter.get("/test", async (req: Request, res: Response) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.status(201).json(users.rows);
  } catch (err) {
    if (err instanceof Error) {
      console.log("Database query error:", err.message);
    } else {
      console.log("Unknown erorr occured");
    }
    res.status(500).send("Internal Server Error");
  }
});

export default userRouter;
