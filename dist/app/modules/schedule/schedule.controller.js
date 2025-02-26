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
exports.scheduleController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const types_1 = require("../../../types");
const http_status_1 = __importDefault(require("http-status"));
const pink_1 = __importDefault(require("../../../shared/pink"));
const schedule_service_1 = require("./schedule.service");
const getIntoBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pink_1.default)(req.query, ["status", "search"]);
    const options = (0, pink_1.default)(req.query, types_1.paginationField);
    const result = yield schedule_service_1.scheduleService.getIntoBD(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule Info successfull",
        meta: {
            page: result.page,
            limit: result.limit,
            total: result.total,
        },
        data: result.data,
    });
}));
const getDoctorScheduleBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schedule_service_1.scheduleService.getDoctorScheduleBD();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule Info successfull",
        data: result,
    });
}));
const storeScheduleBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schedule_service_1.scheduleService.storeScheduleBD(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule store successfull",
        data: result,
    });
}));
const deleteScheduleBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield schedule_service_1.scheduleService.deleteScheduleBD(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "schedule delete successfully",
        data: result,
    });
}));
exports.scheduleController = {
    getIntoBD,
    getDoctorScheduleBD,
    storeScheduleBD,
    deleteScheduleBD
};
