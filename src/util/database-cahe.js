"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalCache = void 0;
class InternalCache {
    constructor() {
        this.cache = {};
    }
    set(key, data, expirationTime) {
        const expiration = Date.now() + expirationTime * 1000;
        this.cache[key] = { data, expiration };
    }
    get(key) {
        const item = this.cache[key];
        if (item && item.expiration > Date.now()) {
            return item.data;
        }
        return null;
    }
    delete(key) {
        delete this.cache[key];
    }
    cleanup() {
        const currentTime = Date.now();
        Object.keys(this.cache).forEach((key) => {
            if (this.cache[key].expiration <= currentTime) {
                this.delete(key);
            }
        });
    }
    clear() {
        this.cache = {};
    }
    getall() {
        return this.cache;
    }
}
exports.InternalCache = InternalCache;
