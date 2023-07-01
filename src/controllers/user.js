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
exports.logoutUser = exports.signupUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("@habeebllahmmj/common");
const password_1 = require("../services/password");
const user_1 = require("../models/user");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (!existingUser) {
        throw new common_1.BadRequestError("Invalid credentials");
    }
    const passwordsMatch = yield password_1.Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new common_1.BadRequestError("Invalid credentials");
    }
    // Generate JWT and store it on the session object
    const userJwt = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        email: existingUser.email,
    }, process.env.JWT_KEY);
    req.session.jwt = userJwt;
    res.status(200).send(existingUser);
});
exports.loginUser = loginUser;
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (existingUser) {
        throw new common_1.BadRequestError("Email in use");
    }
    const user = user_1.User.build({ email, password });
    yield user.save();
    // Generate JWT
    const userJwt = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY);
    req.session.jwt = userJwt;
    res.status(201).json({
        email: user.email,
        id: user.id,
        token: userJwt,
    });
});
exports.signupUser = signupUser;
const logoutUser = (req, res) => {
    req.session.jwt = null;
    res.send({});
};
exports.logoutUser = logoutUser;
