import express from "express";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
const router = express.Router();

router.post("/", authController.loginAuth);
router.post("/refresh-token", authController.refreshToken);
router.post(
  "/change-password",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT),
  authController.changePassword
);

export const authRoutes = router;
