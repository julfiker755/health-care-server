"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
        refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
        resetTokenExpiration: process.env.RESET_TOKEN_EXPIRATION,
        resetPasswordLink: process.env.RESET_PASSWORD_LINK,
    }
};
