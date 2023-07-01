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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const database_cahe_1 = require("../../util/database-cahe");
it("check if cache is working", () => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = yield global.signin();
    yield global.seedData();
    // check if cache is working and data is not present
    const cachedData = new database_cahe_1.InternalCache().get("Abia-state");
    expect(cachedData).toBeNull();
    yield (0, supertest_1.default)(app_1.app)
        .get("/api/region?name=Abia&tag=state")
        .set("Cookie", cookie)
        .send()
        .expect(200);
    // check if cache is working and data is stored
    const cachedData1 = new database_cahe_1.InternalCache().get("Abia-state");
    expect(cachedData1).toBeDefined();
}));
