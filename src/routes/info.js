"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const common_1 = require("@habeebllahmmj/common");
const express_1 = __importDefault(require("express"));
const info_1 = require("../controllers/info");
const router = express_1.default.Router();
exports.searchRouter = router;
router.get("/query", common_1.requireAuth, info_1.searchedPlace);
