import express from "express";
import userRouter from "./controllers/userController";
const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

export default app;
