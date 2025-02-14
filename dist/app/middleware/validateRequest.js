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
const zod_1 = require("zod");
const http_status_1 = __importDefault(require("http-status"));
const validateRequest = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.parseAsync(req.body);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const formattedErrors = err.errors.map((issue) => ({
                    field: issue.path.join("."),
                    code: issue.code,
                    message: issue.message,
                }));
                res.status(http_status_1.default.BAD_REQUEST).json({
                    success: false,
                    message: "Validation failed. Check your sent data",
                    errors: formattedErrors,
                });
                return;
            }
            next(err);
        }
    });
};
exports.default = validateRequest;
