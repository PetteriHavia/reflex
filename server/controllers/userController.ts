import express, { Request, Response } from "express";
import pool from "../utils/db";
import bcrypt from "bcrypt";
import { User, PublicUser } from "../types";

const userRouter = express.Router();

userRouter.get("/test", async (req: Request, res: Response) => {
  console.log("GET /api/users/test called");
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

userRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password, password2 } = req.body;

  if (!name || !email || !password || !password2) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should be at least 6 characters" });
  }

  if (password !== password2) {
    return res.status(400).json({ message: "Passwords do not match " });
  }

  try {
    const existingUser = await pool.query<User>(
      "SELECT id FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query<PublicUser>(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [name, email, hashedPassword]
    );

    const user: PublicUser = result.rows[0];

    return res
      .status(201)
      .json({ message: "User registered succesfully", user });
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
