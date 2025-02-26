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
exports.scheduleService = void 0;
const paginationHelpers_1 = require("../../../shared/paginationHelpers");
const utils_1 = require("../../utils/utils");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const date_fns_1 = require("date-fns");
// getIntoBD
const getIntoBD = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit, sortBy, sortOrder } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { status, search } = filters;
    const addCondition = [];
    if (search) {
        addCondition.push({
            OR: ["date"].map((field) => ({
                [field]: {
                    contains: search === null || search === void 0 ? void 0 : search.toLowerCase(),
                },
            })),
        });
    }
    if (status) {
        addCondition.push({
            status: {
                in: [status === null || status === void 0 ? void 0 : status.toUpperCase()],
            },
        });
    }
    const whereConditions = addCondition.length > 0 ? { AND: addCondition } : {};
    const result = yield prisma_1.default.schedule.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.schedule.count({ where: whereConditions });
    return {
        page,
        limit,
        total,
        data: result,
    };
});
// getDoctorScheduleBD
const getDoctorScheduleBD = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctorSchedule.findMany();
    return result;
});
// storeScheduleBD
const storeScheduleBD = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, startTime, endTime, duration } = data;
    const lastDate = endDate ? new Date(endDate) : new Date();
    let currentDate = new Date(startDate);
    const scheduleArray = [];
    // N.B : 1st loop date create 2nd loop time create
    while (currentDate <= lastDate) {
        const formattedDate = (0, date_fns_1.format)(currentDate, "yyyy-MM-dd");
        const day = (0, date_fns_1.format)(currentDate, "EEEE");
        let finalStartTime = (0, utils_1.customFormatTime)(formattedDate, startTime);
        let finalEndTime = (0, utils_1.customFormatTime)(formattedDate, endTime);
        //  time create loop
        while (finalStartTime < finalEndTime) {
            let slotEnd = new Date(finalStartTime.getTime() + duration * 60000);
            if (slotEnd > finalEndTime)
                break;
            scheduleArray.push({
                date: formattedDate,
                startTime: (0, date_fns_1.format)(finalStartTime, "hh:mm a"),
                endTime: (0, date_fns_1.format)(slotEnd, "hh:mm a"),
                day: day,
            });
            finalStartTime = slotEnd;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    const existingSchedule = yield prisma_1.default.schedule.findFirst({
        where: {
            date: {
                in: scheduleArray.map((schedule) => schedule.date),
            },
        },
    });
    if (existingSchedule) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Already Exists in Your Schedule");
    }
    const result = yield prisma_1.default.schedule.createMany({
        data: scheduleArray,
    });
    return Object.assign(Object.assign({}, result), { id: "fbe3fbf0-d57f-4ca0-889c-bd0dfc9bb1ca" });
});
// deleteScheduleBD
const deleteScheduleBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.schedule.findUniqueOrThrow({
        where: {
            id,
            status: client_1.scheduleStatus.UNBOOKED
        }
    });
    const result = yield prisma_1.default.schedule.delete({
        where: { id }
    });
    return result;
});
exports.scheduleService = {
    getIntoBD,
    getDoctorScheduleBD,
    storeScheduleBD,
    deleteScheduleBD
};
