"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const user_1 = require("./routes/user");
const common_1 = require("@habeebllahmmj/common");
const dotenv_1 = __importDefault(require("dotenv"));
const info_1 = require("./routes/info");
dotenv_1.default.config();
// Create Express app
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, express_session_1.default)({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));
// app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
exports.app.use("/api", user_1.userRouter);
exports.app.use(common_1.currentUser);
exports.app.use("/api", info_1.searchRouter);
exports.app.use("*", (req, res, next) => {
    throw new common_1.NotFoundError("Route not found");
});
exports.app.use(common_1.errorHandler);
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
