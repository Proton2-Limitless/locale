"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stateSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    created: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    history: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
stateSchema.statics.build = (attrs) => {
    return new State(attrs);
};
const State = mongoose_1.default.model("State", stateSchema);
exports.State = State;
