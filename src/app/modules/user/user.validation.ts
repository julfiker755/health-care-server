import { z } from "zod";
import { Gender } from "@prisma/client";
import {preprocessEmail, preprocessString  } from "../../errors/zod";




const adminSchema = z.object({
  password: preprocessString("Password must be 8 characters"),
  admin: z.object({
    email: preprocessEmail("Invalid email address"),
    name: preprocessString("Name is required"),
    contactNumber: preprocessString("Numberis required"),
    gender: preprocessString("Gender is required"),
    address: preprocessString("Address is required"),
  }),
});

const doctorSchema = z.object({
  password: z.string().min(8, "Password must 8 characters"),
  doctor: z.object({
    email: z.string().email("Email is required"),
    name: z.string().min(1, "Name is required"),
    contactNumber: z.string().min(10, {message: 'Phone number must be at least 10 digits.'}),
    address: z.string().min(1, "Address is required"),
    registrationNumber: z.string().min(1, "Registration number is required"),
    experience: z.number().int().min(0, "Experience must be a positive number"),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number().int().min(0, " appointmentFee is required"),
    qualification: z.string().min(1, "Qualification is required"),
    currentWorkingPlace: z.string().min(1, "Current working place is required"),
    designation: z.string().min(1, "Designation is required"),
  })
});

const patientSchema = z.object({
  password: z.string().min(8, "Password must 8 characters"),
  patient: z.object({
    email: z.string().email("Email is required"),
    name: z.string().min(1, "Name is required"),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    contactNumber: z.string().min(10, {message: 'Phone number must 10 digits'}),
    address: z.string().optional(),
  }),
});

export const userValidation = {
  adminSchema,
  doctorSchema,
  patientSchema,
};
