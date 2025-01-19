import { z } from "zod";

const adminSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  admin: z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    contactNumber: z.string().regex(/^\+\d{10,15}$/, "Invalid contact number format"),
    address: z.string().min(1, "Address is required"),
  }),
});

export const userValidation ={
    adminSchema
}


