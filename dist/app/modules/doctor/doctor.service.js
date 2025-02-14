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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorService = void 0;
const client_1 = require("@prisma/client");
const fileUploader_1 = require("../../../shared/fileUploader");
const paginationHelpers_1 = require("../../../shared/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// getIntoBD
const getIntoBD = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page, skip, limit, sortBy, sortOrder } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { search } = filters, filterItem = __rest(filters, ["search"]);
    const addCondition = [];
    if (search) {
        addCondition.push({
            OR: (_a = ["name"]) === null || _a === void 0 ? void 0 : _a.map((field) => ({
                [field]: {
                    contains: search === null || search === void 0 ? void 0 : search.toLowerCase(),
                },
            })),
        });
    }
    if (Object.keys(filterItem).length > 0) {
        addCondition.push({
            AND: Object.keys(filterItem).map((key) => ({
                [key]: {
                    equals: filterItem[key],
                },
            })),
        });
    }
    addCondition.push({
        isDeleted: false,
    });
    const whereConditions = addCondition.length > 0 ? { AND: addCondition } : {};
    const result = yield prisma_1.default.doctor.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            specialities: {
                select: {
                    specialitiesId: false,
                    doctorId: false,
                    specialities: {
                        select: {
                            id: true,
                            title: true,
                            icon: true,
                        },
                    },
                },
            },
            review: true,
        },
    });
    const total = yield prisma_1.default.doctor.count({ where: whereConditions });
    return {
        page,
        limit,
        total,
        data: result.map((item) => (Object.assign(Object.assign({}, item), { specialities: item.specialities.map((item) => item.specialities) }))),
    };
});
// getSingleBD
const getSingleBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: { id },
        include: {
            specialities: true,
            review: true
        }
    });
    return result;
});
// specialitieGetBD
const specialitieGetBD = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            email: user.email,
        },
        include: {
            specialities: {
                select: {
                    specialitiesId: false,
                    doctorId: false,
                    specialities: true,
                },
            },
        },
    });
    return doctorInfo.specialities.map((item) => (Object.assign({}, item.specialities)));
});
// deleteIntoDB
const deleteIntoBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: { id },
    });
    if (!!((_a = doctorInfo.profilePhoto) === null || _a === void 0 ? void 0 : _a.length)) {
        fileUploader_1.fileUploader.deleteFile(doctorInfo.profilePhoto);
    }
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const doctorDeleteInfo = yield tx.doctor.delete({
            where: { id: doctorInfo.id },
        });
        const result = yield tx.user.delete({
            where: {
                email: doctorDeleteInfo.email,
            },
        });
        return result;
    }));
    return result;
});
// softDeleteBD
const softDeleteBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            id: id,
            isDeleted: false,
        },
    });
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const doctorDeleteInfo = yield tx.doctor.update({
            where: { id: doctorInfo.id },
            data: { isDeleted: true },
        });
        const result = yield tx.user.update({
            where: {
                email: doctorDeleteInfo.email,
            },
            data: {
                status: client_1.userStatus.DELETED,
            },
        });
        return result;
    }));
    return result;
});
// specialitieStoreBD
const specialitieStoreBD = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    for (const ids of data === null || data === void 0 ? void 0 : data.specialitiesId) {
        yield prisma_1.default.doctorSpecialities.create({
            data: {
                specialitiesId: ids,
                doctorId: doctorInfo.id,
            },
        });
    }
    const result = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            id: doctorInfo.id,
        },
        include: {
            specialities: true,
        },
    });
    return result;
});
const updateProfileBD = (user, file, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (file)
        data.profilePhoto = file === null || file === void 0 ? void 0 : file.filename;
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    // Delete the previous image
    if (((_a = doctorInfo.profilePhoto) === null || _a === void 0 ? void 0 : _a.length) && ((_b = file === null || file === void 0 ? void 0 : file.filename) === null || _b === void 0 ? void 0 : _b.length)) {
        fileUploader_1.fileUploader.deleteFile(doctorInfo.profilePhoto);
    }
    const result = yield prisma_1.default.doctor.update({
        where: {
            email: user.email,
        },
        data: data,
    });
    return result;
});
exports.doctorService = {
    getIntoBD,
    getSingleBD,
    deleteIntoBD,
    softDeleteBD,
    updateProfileBD,
    specialitieStoreBD,
    specialitieGetBD,
};
