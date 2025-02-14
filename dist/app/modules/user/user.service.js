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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const paginationHelpers_1 = require("../../../shared/paginationHelpers");
const getIntoBD = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit, sortBy, sortOrder } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { search } = filters;
    const addCondition = [];
    if (search) {
        addCondition.push({
            OR: ["email"].map((field) => ({
                [field]: {
                    contains: search.toLowerCase(),
                },
            })),
        });
    }
    const whereConditions = addCondition.length > 0 ? { AND: addCondition } : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {},
    });
    const total = yield prisma_1.default.user.count({ where: whereConditions });
    return {
        page,
        limit,
        total,
        data: result,
    };
});
const getMyProfileBD = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
            status: client_1.userStatus.ACTIVE,
        },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
        },
    });
    let profileInfo;
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === client_1.userRole.SUPER_ADMIN) {
        profileInfo = yield prisma_1.default.admin.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    else if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === client_1.userRole.ADMIN) {
        profileInfo = yield prisma_1.default.admin.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    else if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === client_1.userRole.DOCTOR) {
        profileInfo = yield prisma_1.default.doctor.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    else if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === client_1.userRole.PATIENT) {
        profileInfo = yield prisma_1.default.patient.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    return Object.assign(Object.assign({}, userInfo), profileInfo);
});
// admin
const insertAdminBD = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = bcrypt_1.default.hashSync(data.password, 10);
    const userData = {
        email: data.admin.email,
        password: hashPassword,
        role: client_1.userRole.ADMIN,
    };
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.user.create({
            data: userData,
        });
        const adminInfo = yield tx.admin.create({
            data: data.admin,
        });
        return adminInfo;
    }));
    return result;
});
// doctor
const insertDoctorBD = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = bcrypt_1.default.hashSync(data.password, 10);
    const userData = {
        email: data.doctor.email,
        password: hashPassword,
        role: client_1.userRole.DOCTOR,
    };
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.user.create({
            data: userData,
        });
        const doctorInfo = yield tx.doctor.create({
            data: data.doctor,
        });
        return doctorInfo;
    }));
    return result;
});
// patient
const insertPatientBD = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = bcrypt_1.default.hashSync(data.password, 10);
    const userData = {
        email: data.patient.email,
        password: hashPassword,
        role: client_1.userRole.PATIENT,
    };
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.user.create({
            data: userData,
        });
        const patientInfo = yield tx.patient.create({
            data: data.patient,
        });
        return patientInfo;
    }));
    return result;
});
exports.userService = {
    getIntoBD,
    getMyProfileBD,
    insertAdminBD,
    insertDoctorBD,
    insertPatientBD,
};
