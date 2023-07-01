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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchedPlace = void 0;
const common_1 = require("@habeebllahmmj/common");
const database_cahe_1 = require("../util/database-cahe");
const cache = new database_cahe_1.InternalCache();
const helper_1 = require("../util/helper");
const searchedPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cache.clear();
    const { tag, name } = req.query;
    if (!name || !tag) {
        throw new common_1.BadRequestError("Please provide a description of where you are searching");
    }
    const nameStr = name.toString();
    let tagStr = tag.toString();
    const getdatafromtepdb = yield cache.get(nameStr);
    if (getdatafromtepdb)
        return res.json({ data: getdatafromtepdb });
    return (0, helper_1.response)(cache, res, nameStr, tagStr);
});
exports.searchedPlace = searchedPlace;
