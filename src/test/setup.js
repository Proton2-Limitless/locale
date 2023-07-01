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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const supertest_1 = __importDefault(require("supertest"));
const state_1 = require("../models/state");
const lg_1 = require("../models/lg");
const data_1 = require("../data");
const lgdata_1 = require("../data/lgdata");
let mongo;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.JWT_KEY = "asdfasdf";
    mongo = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    yield mongoose_1.default.connect(mongoUri, {});
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield mongoose_1.default.connection.db.collections();
    for (let collection of collections) {
        yield collection.deleteMany({});
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (mongo) {
        yield mongo.stop();
    }
    yield mongoose_1.default.disconnect();
}));
global.signin = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = "test@test.com";
    const password = "password";
    const authResponse = yield (0, supertest_1.default)(app_1.app)
        .post("/api/users/signup")
        .send({
        email,
        password,
    })
        .expect(201); // signup user and not neccesary
    const cookie = authResponse.get("Set-Cookie");
    return cookie;
});
global.seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield state_1.State.insertMany(data_1.nigeriaStates);
    yield lg_1.Lg.insertMany(lgdata_1.lgData);
});
