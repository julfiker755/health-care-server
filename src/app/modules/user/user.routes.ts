import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/my-profile",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT),
  userController.getMyProfileBD
);

router.post(
  "/admin-store",
  validateRequest(userValidation.adminSchema),
  userController.insertAdminBD
);

router.post(
  "/doctor-store",
  validateRequest(userValidation.doctorSchema),
  userController.insertDoctorBD
);

router.post(
  "/patient-store",
  validateRequest(userValidation.patientSchema),
  userController.insertPatientBD
);

export const userRoutes = router;
