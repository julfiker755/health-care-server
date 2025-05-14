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
// storeGetBD
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
    const whereConditions = { AND: addCondition };
    const result = yield prisma_1.default.specialities.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        omit: {
            createdAt: true,
            updatedAt: true,
        },
        include: {
            doctor: {
                select: {
                    specialitiesId: false,
                    doctorId: false,
                    doctor: {
                        omit: {
                            createdAt: true,
                            updatedAt: true,
                            isDeleted: true,
                        },
                    }
                },
            },
        },
    });
    const total = yield prisma_1.default.specialities.count({
        where: whereConditions,
    });
    return {
        page,
        limit,
        total,
        data: result.map((item) => (Object.assign(Object.assign({}, item), { doctor: item.doctor.map((item) => item.doctor) }))),
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
// deleteSpceialitiesBD
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
    // doctorpecialities  find the all database
    const doctorSpecialities = yield prisma_1.default.doctorSpecialities.findMany({
        where: {
            specialitiesId: id,
        },
    });
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        if ((doctorSpecialities === null || doctorSpecialities === void 0 ? void 0 : doctorSpecialities.length) > 0) {
            for (const specialty of doctorSpecialities) {
                yield tx.doctorSpecialities.delete({
                    where: {
                        specialitiesId_doctorId: {
                            doctorId: specialty.doctorId,
                            specialitiesId: specialty.specialitiesId,
                        },
                    },
                });
            }
        }
        const result = yield tx.specialities.delete({
            where: { id },
        });
        return result;
    }));
    return result;
});
// updateSpceialitiesBD
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
