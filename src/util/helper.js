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
exports.response = void 0;
const common_1 = require("@habeebllahmmj/common");
const state_1 = require("../models/state");
const lg_1 = require("../models/lg");
const response = (cache, res, nameStr, tag) => __awaiter(void 0, void 0, void 0, function* () {
    let name = tag == "state" ? nameStr.split(" ")[0] : nameStr;
    let state;
    let searchname = tag == "region" ? "region" : "name";
    let statelg;
    let result = yield state_1.State.find({ [searchname]: name });
    if (tag == "state") {
        state = nameStr.includes("State") ? nameStr : nameStr.concat(" State");
        statelg = yield lg_1.Lg.find({ state });
        if (result.length == 0) {
            throw new common_1.NotFoundError("not found");
        }
        const data = [
            {
                name: result[0].name,
                created: result[0].created,
                region: result[0].region,
                history: result[0].history,
                lg: statelg,
            },
        ];
        result = data;
    }
    if (tag == "lg") {
        result = yield lg_1.Lg.find({ name });
    }
    if (result.length == 0) {
        throw new common_1.NotFoundError("not found");
    }
    cache.set(nameStr, result, 3600);
    return res.json({ data: result });
});
exports.response = response;
