"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const mongoose_1 = __importDefault(require("mongoose"));
const database_cahe_1 = require("./util/database-cahe");
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
// import { State } from "./models/state";
// import { nigeriaStates } from "./data";
// import { Lg } from "./models/lg";
// import { lgData } from "./data/lgdata";
dotenv_1.default.config();
const cache = new database_cahe_1.InternalCache();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
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
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error(err);
    }
    //   State.insertMany(nigeriaStates);
    // Lg.insertMany(lgData);
    const cleanupInterval = 5 * 60 * 1000; // 5 minutes
    setInterval(() => {
        cache.cleanup();
    }, cleanupInterval);
    app_1.app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
});
start();
