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
it("returns satte if query is valid", () => __awaiter(void 0, void 0, void 0, function* () {
    yield global.seedData();
    const cookie = yield global.signin();
    const response = yield (0, supertest_1.default)(app_1.app)
        .get("/api/region?name=Abia&tag=state")
        .set("Cookie", cookie)
        .send()
        .expect(200);
    expect(response.body.data.length).toEqual(1);
    expect(response.body.data[0].name).toEqual("Abia");
    const response2 = yield (0, supertest_1.default)(app_1.app)
        .get("/api/region?name=Zurmi&tag=lg")
        .set("Cookie", cookie)
        .send()
        .expect(200);
    expect(response2.body.data.length).toEqual(1);
    expect(response2.body.data[0].name).toEqual("Zurmi");
    const response3 = yield (0, supertest_1.default)(app_1.app)
        .get("/api/region?name=North East&tag=region")
        .set("Cookie", cookie)
        .send()
        .expect(200);
    expect(response3.body.data.length).toEqual(6);
    expect(response3.body.data[0].region).toEqual("North East");
}));
