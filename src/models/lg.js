"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lg = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const lgSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    created: {
        type: String,
        required: true,
    },
    history: {
        type: String,
        required: true,
    },
    state: {
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
lgSchema.statics.build = (attrs) => {
    return new Lg(attrs);
};
const Lg = mongoose_1.default.model("Lg", lgSchema);
exports.Lg = Lg;
