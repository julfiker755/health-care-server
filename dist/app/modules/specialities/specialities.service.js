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
exports.specialitiesService = void 0;
const fileUploader_1 = require("../../../shared/fileUploader");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelpers_1 = require("../../../shared/paginationHelpers");
const storeGetBD = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit, sortBy, sortOrder } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { search } = filters;
    const addCondition = [];
    if (search) {
        addCondition.push({
            OR: ["title"].map((field) => ({
                [field]: {
                    contains: search === null || search === void 0 ? void 0 : search.toLowerCase(),
                },
            })),
        });
    }
    //  console.dir(addCondition,{depth:'inifinity'})
    const whereConditions = { AND: addCondition };
    const result = yield prisma_1.default.specialities.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            doctor: {
                select: {
                    specialitiesId: false,
                    doctorId: false,
                    doctor: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            profilePhoto: true,
                            contactNumber: true,
                            address: true,
                            registrationNumber: true,
                            experience: true,
                            gender: true,
                            appointmentFee: true,
                            qualification: true,
                            currentWorkingPlace: true,
                            designation: true,
                            averageRating: true,
                            isDeleted: true
                        }
                    }
                }
            }
        }
    });
    const total = yield prisma_1.default.specialities.count({
        where: whereConditions
    });
    return {
        page,
        limit,
        total,
        data: result.map((item) => (Object.assign(Object.assign({}, item), { doctor: item.doctor.map(item => item.doctor) }))),
    };
});
const storeSpceialitiesBD = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (file)
        data.icon = file === null || file === void 0 ? void 0 : file.filename;
    const result = yield prisma_1.default.specialities.create({
        data: data,
    });
    return result;
});
const deleteSpceialitiesBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const specialitiesInfo = yield prisma_1.default.specialities.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (!!((_a = specialitiesInfo.icon) === null || _a === void 0 ? void 0 : _a.length)) {
        fileUploader_1.fileUploader.deleteFile(specialitiesInfo.icon);
    }
    const result = yield prisma_1.default.specialities.delete({
        where: { id },
    });
    return result;
});
const updateSpceialitiesBD = (file, data, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (file)
        data.icon = file === null || file === void 0 ? void 0 : file.filename;
    const specialitiesInfo = yield prisma_1.default.specialities.findUniqueOrThrow({
        where: {
            id,
        },
    });
    //Delete the previous image.
    if (((_a = specialitiesInfo.icon) === null || _a === void 0 ? void 0 : _a.length) && ((_b = file === null || file === void 0 ? void 0 : file.filename) === null || _b === void 0 ? void 0 : _b.length)) {
        fileUploader_1.fileUploader.deleteFile(specialitiesInfo.icon);
    }
    const result = yield prisma_1.default.specialities.update({
        where: {
            id,
        },
        data: data,
    });
    return result;
});
exports.specialitiesService = {
    updateSpceialitiesBD,
    storeSpceialitiesBD,
    deleteSpceialitiesBD,
    storeGetBD,
};
