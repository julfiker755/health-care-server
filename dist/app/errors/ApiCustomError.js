"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiCustomError extends Error {
    constructor(message, customErrors, stack = "") {
        super(message);
        if (customErrors) {
            this.customErrors = customErrors;
        }
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiCustomError;
