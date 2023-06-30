import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { userRouter } from "./routes/user";
import { errorHandler, NotFoundError, currentUser } from "@habeebllahmmj/common";
import dotenv from "dotenv";
import { searchRouter } from "./routes/info";

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


app.use("/api",userRouter);

app.use(currentUser);
app.use("/api",searchRouter);

app.use("*", (req, res, next) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);
// Create an instance of the internal cache


// Middleware to perform cache cleanup
// const cacheCleanupMiddleware = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   cache.cleanup();
//   next();
// };

// Route handler
// app.post("/data", (req, res) => {
//   // Get the data from the database
//   const data = { name: "John Doe" };
//   // Cache the data for 1 minute
//   cache.set("myKey", data, 10);
//   res.json(data);
// });
// app.get("/data", cacheCleanupMiddleware, (req, res) => {
//   // Check if data is available in the cache
//   const cachedData = cache.get("myKey");
//   res.json(cachedData);
// });

