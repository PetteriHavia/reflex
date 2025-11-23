import express, { Request, Response } from "express";
import pool from "../utils/db";
import bcrypt from "bcrypt";
import { User } from "../types";
import { toPublicUser } from "../utils/toPublicUser";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.get("/test", async (req: Request, res: Response) => {
  console.log("GET /api/users/test called");
  try {
    const users = await pool.query("SELECT * FROM users");
    res.status(200).json(users.rows);
  } catch (err) {
    if (err instanceof Error) {
      console.log("Database query error:", err.message);
    } else {
      console.log("Unknown erorr occured");
    }
    res.status(500).send("Internal Server Error");
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE username=$1 OR email=$1",
      [identifier]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    const publicUser = toPublicUser(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_DEV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({ publicUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

userRouter.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, password2 } = req.body;

  if (!username || !email || !password || !password2) {
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

    const result = await pool.query<User>(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, email, hashedPassword]
    );

    const user = result.rows[0];

    const publicUser = toPublicUser(user);

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET as string,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_DEV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: "User registered succesfully", publicUser });
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
