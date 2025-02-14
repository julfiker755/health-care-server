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
exports.doctorController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const types_1 = require("../../../types");
const http_status_1 = __importDefault(require("http-status"));
const doctor_service_1 = require("./doctor.service");
const pink_1 = __importDefault(require("../../../shared/pink"));
const getIntoBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pink_1.default)(req.query, ["search", "name", "email", "address", "gender"]);
    const options = (0, pink_1.default)(req.query, types_1.paginationField);
    const result = yield doctor_service_1.doctorService.getIntoBD(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Doctor Info successfully",
        meta: {
            page: result.page,
            limit: result.limit,
            total: result.total
        },
        data: result.data
    });
}));
const getSingleBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield doctor_service_1.doctorService.getSingleBD(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Doctor Single Info successfully",
        data: result
    });
}));
const deleteIntoBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield doctor_service_1.doctorService.deleteIntoBD(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Doctor delete successfully",
        data: result
    });
}));
const softDeleteBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield doctor_service_1.doctorService.softDeleteBD(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Doctor soft delete successfully",
        data: result
    });
}));
const specialitieStoreBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield doctor_service_1.doctorService.specialitieStoreBD(user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Doctor specialitie create successfully",
        data: result
    });
}));
const specialitieGetBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield doctor_service_1.doctorService.specialitieGetBD(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Doctor specialities info successfully",
        data: result
    });
}));
const updateProfileBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield doctor_service_1.doctorService.updateProfileBD(user, req.file, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Profile Update successfully",
        data: result
    });
}));
exports.doctorController = {
    getIntoBD,
    getSingleBD,
    deleteIntoBD,
    softDeleteBD,
    updateProfileBD,
    specialitieStoreBD,
    specialitieGetBD
};
