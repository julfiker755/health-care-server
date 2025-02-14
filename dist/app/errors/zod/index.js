"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessNumber = exports.preprocessEmail = exports.preprocessString = void 0;
const zod_1 = require("zod");
// Preprocess and validate non-empty strings
const preprocessString = (message) => zod_1.z.preprocess((val) => (typeof val === "string" ? val : ""), zod_1.z.string().nonempty(message));
exports.preprocessString = preprocessString;
// Preprocess and validate email addresses
const preprocessEmail = (message) => zod_1.z.preprocess((val) => (typeof val === "string" ? val : ""), zod_1.z.string().email(message));
exports.preprocessEmail = preprocessEmail;
// Preprocess and validate phone numbers (international format)
const preprocessNumber = (message) => zod_1.z.preprocess((val) => (typeof val === "string" ? val : ""), zod_1.z.string().regex(/^\+\d{10,15}$/, message));
exports.preprocessNumber = preprocessNumber;
