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
const ApiCustomError_1 = __importDefault(require("../../errors/ApiCustomError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const emailSender_1 = __importDefault(require("../../../helpers/emailSender"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
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
        throw new ApiCustomError_1.default("user email Error", [{
                field: "email",
                code: "invalid_type",
                message: "User not found",
            }]);
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(data.password, userData.password);
    if (!isCorrectPassword) {
        throw new ApiCustomError_1.default("user Password Error", [{
                field: "password",
                code: "invalid_type",
                message: "Password is not vaild",
            }]);
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
        throw new ApiCustomError_1.default("user email Error", [{
                field: "email",
                code: "invalid_type",
                message: "User not found",
            }]);
    }
    const resetPasswordToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userInfo.email,
        role: userInfo.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.resetTokenExpiration);
    const resetPasswordLink = config_1.default.jwt.resetPasswordLink +
        `?userId=${userInfo.id}&token=${resetPasswordToken}`;
    yield (0, emailSender_1.default)(userInfo.email, `
  <table>
    <tr>
        <td>
            <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width:670px; background:#fff; border-radius:3px; text-align:center; 
                            -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06); -moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);
                            box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:0 35px;">
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0; font-size:32px; font-family:'Rubik',sans-serif;">
                                        You have requested to reset your password
                                    </h1>
                                    <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; 
                                        border-bottom:1px solid #cecece; width:100px;">
                                    </span>
                                    <p style="color:#455056; font-size:15px; line-height:24px; margin:0;">
                                        We cannot simply send you your old password. A unique link to reset your
                                        password has been generated for you. To reset your password, click the
                                        following link and follow the instructions.
                                    </p>
                                    <a href=${resetPasswordLink}
                                        style="background:#20e277; text-decoration:none !important; font-weight:500; 
                                        margin-top:35px; color:#fff; text-transform:uppercase; font-size:14px; 
                                        padding:10px 24px; display:inline-block; border-radius:50px;">
                                        Reset Password
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>

  `);
});
// reset password
const resetPassword = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: data.id,
            status: client_1.userStatus.ACTIVE,
        },
    });
    const isVaildToken = jwtHelpers_1.jwtHelpers.varifyToken(token, config_1.default.jwt.secret);
    if (!isVaildToken) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden");
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
});
exports.authService = {
    loginAuth,
    refreshToken,
    resetPassword,
    changePassword,
    forgotPassword,
};
