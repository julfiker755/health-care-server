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
exports.specialitiesController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const types_1 = require("../../../types");
const http_status_1 = __importDefault(require("http-status"));
const specialities_service_1 = require("./specialities.service");
const pink_1 = __importDefault(require("../../../shared/pink"));
const storeGetBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pink_1.default)(req.query, ["search"]);
    const options = (0, pink_1.default)(req.query, types_1.paginationField);
    const result = yield specialities_service_1.specialitiesService.storeGetBD(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Specialties Info successfully",
        meta: {
            page: result.page,
            limit: result.limit,
            total: result.total
        },
        data: result.data
    });
}));
const storeSpceialitiesBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield specialities_service_1.specialitiesService.storeSpceialitiesBD(req.file, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Specialties store successfully",
        data: result,
    });
}));
const deleteSpceialitiesBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield specialities_service_1.specialitiesService.deleteSpceialitiesBD(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Specialties delete successfully",
        data: result,
    });
}));
const updateSpceialitiesBD = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield specialities_service_1.specialitiesService.updateSpceialitiesBD(req.file, req.body, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Spceialities Update successfully",
        data: result,
    });
}));
exports.specialitiesController = {
    storeGetBD,
    updateSpceialitiesBD,
    storeSpceialitiesBD,
    deleteSpceialitiesBD,
};
