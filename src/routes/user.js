"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_validator_1 = require("express-validator");
const common_1 = require("@habeebllahmmj/common");
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
exports.userRouter = router;
router.post("/users/signup", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
], common_1.validateRequest, user_1.signupUser);
router.post("/users/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
], common_1.validateRequest, user_1.loginUser);
router.post("/users/logout", user_1.logoutUser);
