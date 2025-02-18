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
exports.authService = void 0;
const emailTemplate_1 = require("../../../helpers/emailTemplate");
const ApiCustomError_1 = __importDefault(require("../../errors/ApiCustomError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const emailSender_1 = __importDefault(require("../../../helpers/emailSender"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// auth login
const loginAuth = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
            status: client_1.userStatus.ACTIVE,
        },
    });
    if (!userData) {
        throw new ApiCustomError_1.default("user email Error", [
            {
                field: "email",
                code: "invalid_type",
                message: "User not found",
            },
        ]);
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(data.password, userData.password);
    if (!isCorrectPassword) {
        throw new ApiCustomError_1.default("user Password Error", [
            {
                field: "password",
                code: "invalid_type",
                message: "Password is not vaild",
            },
        ]);
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.accessTokenExpiration);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.refreshTokenExpiration);
    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange,
    };
});
//   refreshToken
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedToken;
    try {
        decodedToken = jwtHelpers_1.jwtHelpers.varifyToken(token, config_1.default.jwt.secret);
    }
    catch (err) {
        throw new Error("You do not have permission.");
    }
    const isUserExsis = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedToken.email,
            status: client_1.userStatus.ACTIVE,
        },
    });
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: isUserExsis.email,
        role: isUserExsis.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.refreshTokenExpiration);
    return {
        accessToken,
        needPasswordChange: isUserExsis.needPasswordChange,
    };
});
// change password
const changePassword = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: client_1.userStatus.ACTIVE,
        },
    });
    const isCorrectPassword = yield bcrypt_1.default.compare(data.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password is not vaild");
    }
    const hashPassword = bcrypt_1.default.hashSync(data.newPassword, 10);
    const result = yield prisma_1.default.user.update({
        where: {
            email: userData.email,
        },
        data: {
            password: hashPassword,
            needPasswordChange: true,
        },
    });
    return result;
});
// forgot password
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUnique({
        where: {
            email: email,
            status: client_1.userStatus.ACTIVE,
        },
    });
    if (!userInfo) {
        throw new ApiCustomError_1.default("user email Error", [
            {
                field: "email",
                code: "invalid_type",
                message: "User not found",
            },
        ]);
    }
    const resetPasswordToken = jwtHelpers_1.jwtHelpers.generateToken({
        id: userInfo.id,
        email: userInfo.email,
        role: userInfo.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.resetPasswordExpiration);
    const resetPasswordLink = config_1.default.jwt.resetPasswordLink + `?token=${resetPasswordToken}`;
    yield (0, emailSender_1.default)(userInfo.email, (0, emailTemplate_1.template)(resetPasswordLink));
});
// reset password
const resetPassword = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: data.id,
            status: client_1.userStatus.ACTIVE,
        },
    });
    const isVaildToken = jwtHelpers_1.jwtHelpers.varifyToken(token, config_1.default.jwt.secret);
    if (!isVaildToken) {
        throw new ApiCustomError_1.default("token expire", [
            {
                field: "token",
                code: "invalid_type",
                message: "Your Link is expire",
            },
        ]);
    }
    // hash password
    const password = yield bcrypt_1.default.hash(data.password, 12);
    yield prisma_1.default.user.update({
        where: {
            id: data.id,
        },
        data: {
            password,
        },
    });
    return {
        email: userInfo.email,
    };
});
exports.authService = {
    loginAuth,
    refreshToken,
    resetPassword,
    changePassword,
    forgotPassword,
};
