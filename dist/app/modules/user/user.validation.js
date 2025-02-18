"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const zod_2 = require("../../errors/zod");
const adminSchema = zod_1.z.object({
    password: (0, zod_2.preprocessString)("Password must be 8 characters"),
    admin: zod_1.z.object({
        email: (0, zod_2.preprocessEmail)("Invalid email address"),
        name: (0, zod_2.preprocessString)("Name is required"),
        contactNumber: (0, zod_2.preprocessString)("Numberis required"),
        gender: (0, zod_2.preprocessString)("Gender is required"),
        address: (0, zod_2.preprocessString)("Address is required"),
    }),
});
const doctorSchema = zod_1.z.object({
    password: zod_1.z.string().min(8, "Password must 8 characters"),
    doctor: zod_1.z.object({
        email: zod_1.z.string().email("Email is required"),
        name: zod_1.z.string().min(1, "Name is required"),
        contactNumber: zod_1.z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
        address: zod_1.z.string().min(1, "Address is required"),
        registrationNumber: zod_1.z.string().min(1, "Registration number is required"),
        experience: zod_1.z.number().int().min(0, "Experience must be a positive number"),
        gender: zod_1.z.enum([client_1.Gender.MALE, client_1.Gender.FEMALE]),
        appointmentFee: zod_1.z.number().int().min(0, " appointmentFee is required"),
        qualification: zod_1.z.string().min(1, "Qualification is required"),
        currentWorkingPlace: zod_1.z.string().min(1, "Current working place is required"),
        designation: zod_1.z.string().min(1, "Designation is required"),
    })
});
const patientSchema = zod_1.z.object({
    password: zod_1.z.string().min(8, "Password must 8 characters"),
    patient: zod_1.z.object({
        email: zod_1.z.string().email("Email is required"),
        name: zod_1.z.string().min(1, "Name is required"),
        gender: zod_1.z.enum([client_1.Gender.MALE, client_1.Gender.FEMALE]),
        contactNumber: zod_1.z.string().min(10, { message: 'Phone number must 10 digits' }),
        address: zod_1.z.string().optional(),
    }),
});
exports.userValidation = {
    adminSchema,
    doctorSchema,
    patientSchema,
};
