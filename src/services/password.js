"use strict";
// import { scrypt, randomBytes } from 'crypto';
// import { promisify } from 'util';
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
exports.Password = void 0;
// const scryptAsync = promisify(scrypt);
// import bcrypt from 'bcryptjs';
// export class Password {
//     static async toHash(password: string) {
//         // const salt = randomBytes(8).toString('hex');
//         // const buf = (await scryptAsync(password, salt, 64)) as Buffer;
//         // return `${buf.toString('hex')}.${salt}`;
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         return hashedPassword;
//     }
//     static async compare(storedPassword: string, suppliedPassword: string) {
//         // const [hashedPassword, salt] = storedPassword.split('.');
//         // const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
//         // return buf.toString('hex') === hashedPassword;
//         const isMatch = await bcrypt.compare(suppliedPassword, storedPassword);
//         return isMatch;
//     }
// }
const crypto_1 = require("crypto");
const util_1 = require("util");
const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
class Password {
    static toHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = (0, crypto_1.randomBytes)(8).toString('hex');
            const buf = (yield scryptAsync(password, salt, 64));
            return `${buf.toString('hex')}.${salt}`;
        });
    }
    static compare(storedPassword, suppliedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hashedPassword, salt] = storedPassword.split('.');
            const buf = (yield scryptAsync(suppliedPassword, salt, 64));
            return buf.toString('hex') === hashedPassword;
        });
    }
}
exports.Password = Password;
