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
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
// getIntoBD
const getIntoBD = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit, sortBy, sortOrder } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { search, gender, experience, speciality } = filters, filterItem = __rest(filters, ["search", "gender", "experience", "speciality"]);
    const addCondition = [];
    if (search) {
        addCondition.push({
            name: {
                contains: search === null || search === void 0 ? void 0 : search.toLowerCase(),
            },
        });
    }
    if (gender) {
        addCondition.push({
            gender: {
                in: [gender === null || gender === void 0 ? void 0 : gender.toUpperCase()],
            },
        });
    }
    if (experience) {
        const exp = parseInt(experience);
        addCondition.push({
            experience: exp > 6 ? { gte: exp } : { lte: exp },
        });
    }
    if (speciality) {
        addCondition.push({
            specialities: {
                some: {
                    specialities: {
                        title: speciality === null || speciality === void 0 ? void 0 : speciality.toLowerCase(),
                    },
                },
            },
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
            specialities: {
                select: {
                    specialities: true,
                },
            },
            schedule: {
                select: {
                    schedule: true,
                },
            },
            review: true,
        },
    });
    return Object.assign(Object.assign({}, result), { specialities: result.specialities.map((item) => item.specialities), schedule: result.schedule.map((item) => item.schedule) });
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
// updateProfileBD
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
// doctor specialitieGetBD
const specialitieGetBD = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const result = yield prisma_1.default.doctorSpecialities.findMany({
        where: {
            doctorId: doctorInfo.id,
        },
        include: {
            specialities: true,
        },
    });
    return result.map((item) => item.specialities);
});
// doctorspecialitieStoreBD
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
// doctorspecialitieDelete
const specialitieDeleteBD = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const result = yield prisma_1.default.doctorSpecialities.delete({
        where: {
            specialitiesId_doctorId: {
                specialitiesId: id,
                doctorId: doctorInfo.id,
            },
        },
        include: {
            specialities: true,
            doctor: false,
        },
    });
    return result === null || result === void 0 ? void 0 : result.specialities;
});
// scheduleGetBD
const scheduleGetBD = (user, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const result = yield prisma_1.default.doctorSchedule.findMany({
        where: {
            doctorId: doctorInfo.id,
        },
        skip,
        take: limit,
        include: {
            schedule: {
                select: {
                    id: true,
                    date: true,
                    day: true,
                    startTime: true,
                    endTime: true,
                    status: false
                },
            },
        },
    });
    const total = yield prisma_1.default.doctorSchedule.count({
        where: { doctorId: doctorInfo.id },
    });
    return {
        page,
        limit,
        total,
        data: result.map((item) => (Object.assign(Object.assign({}, item.schedule), { isBooked: item.isBooked }))),
    };
});
// scheduleStoreBD
const scheduleStoreBD = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        for (const id of data === null || data === void 0 ? void 0 : data.scheduleId) {
            yield tx.doctorSchedule.create({
                data: {
                    doctorId: doctorInfo.id,
                    scheduleId: id,
                },
            });
        }
        for (const id of data === null || data === void 0 ? void 0 : data.scheduleId) {
            yield tx.schedule.update({
                where: {
                    id: id,
                },
                data: {
                    status: client_1.scheduleStatus.BOOKED,
                },
            });
        }
    }));
    const result = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            id: doctorInfo.id,
        },
        include: {
            schedule: {
                select: {
                    schedule: true,
                },
            },
        },
    });
    return result.schedule.map((item) => item.schedule);
});
// scheduleDeleteBD
const scheduleDeleteBD = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorInfo = yield prisma_1.default.doctor.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const exsisBooking = yield prisma_1.default.doctorSchedule.findUniqueOrThrow({
        where: {
            doctorId_scheduleId: {
                doctorId: doctorInfo.id,
                scheduleId: id,
            }
        }
    });
    if (exsisBooking.isBooked === true) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Already Booking not Delete");
    }
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield tx.doctorSchedule.delete({
            where: {
                doctorId_scheduleId: {
                    doctorId: doctorInfo.id,
                    scheduleId: id,
                },
            },
            include: {
                doctor: false,
                schedule: true,
            },
        });
        yield tx.schedule.update({
            where: { id },
            data: {
                status: client_1.scheduleStatus.UNBOOKED,
            },
        });
        return result;
    }));
    return result.schedule;
});
exports.doctorService = {
    getIntoBD,
    getSingleBD,
    deleteIntoBD,
    softDeleteBD,
    updateProfileBD,
    specialitieStoreBD,
    specialitieGetBD,
    specialitieDeleteBD,
    scheduleGetBD,
    scheduleStoreBD,
    scheduleDeleteBD,
};
