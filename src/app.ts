import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { userRouter } from "./routes/user";
import { errorHandler, NotFoundError, currentUser } from "@habeebllahmmj/common";
import dotenv from "dotenv";
import { searchRouter } from "./routes/info";
import cors from "cors";

dotenv.config();
// Create Express app
export const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors())
app.use("/api",userRouter);

app.use(currentUser);
app.use("/api",searchRouter);

app.use("*", (req, res, next) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);
