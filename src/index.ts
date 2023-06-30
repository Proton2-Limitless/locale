import "express-async-errors";
import mongoose from "mongoose";
import { InternalCache } from "./util/database-cahe";
import { app } from "./app";
import dotenv from "dotenv";
// import { State } from "./models/state";
// import { nigeriaStates } from "./data";
// import { Lg } from "./models/lg";
// import { lgData } from "./data/lgdata";

dotenv.config();

const cache = new InternalCache();

const start = async () => {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY must be defined");
  }
  if (!process.env.JWT_KEY) {
    throw new Error("SECRET_KEY must be defined");
  }
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
  //   State.insertMany(nigeriaStates);
  // Lg.insertMany(lgData);
  const cleanupInterval = 5 * 60 * 1000; // 5 minutes
  setInterval(() => {
    cache.cleanup();
  }, cleanupInterval);
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
