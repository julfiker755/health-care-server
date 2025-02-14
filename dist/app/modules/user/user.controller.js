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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pink_1 = __importDefault(require("../../../shared/pink"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const types_1 = require("../../../types");
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const getIntoBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pink_1.default)(req.query, ["search"]);
    const options = (0, pink_1.default)(req.query, types_1.paginationField);
    const result = yield user_service_1.userService.getIntoBD(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User info successfully",
        meta: {
            page: result.page,
            limit: result.limit,
            total: result.total
        },
        data: result.data,
    });
}));
const getMyProfileBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getMyProfileBD(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Profile info successfully",
        data: result,
    });
}));
const insertAdminBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.insertAdminBD(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Admin created successfully",
        data: result,
    });
}));
const insertDoctorBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.insertDoctorBD(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Doctor created successfully",
        data: result,
    });
}));
const insertPatientBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.insertPatientBD(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Patient created successfully",
        data: result,
    });
}));
exports.userController = {
    getIntoBD,
    getMyProfileBD,
    insertAdminBD,
    insertDoctorBD,
    insertPatientBD,
};
