import express from "express";
import userRouter from "./controllers/userController";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);

app.use(errorHandler);

export default app;
