import express from "express";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import { scheduleController } from "./schedule.controller";
const router = express.Router();

router.get(
  "/",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN,userRole.DOCTOR),
  scheduleController.getIntoBD
);
router.get(
  "/doctor-schedule-all",
  auth(userRole.PATIENT),
  scheduleController.getDoctorScheduleBD
);
router.post(
  "/store",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN),
  scheduleController.storeScheduleBD
);
router.delete(
  "/:id",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN),
  scheduleController.deleteScheduleBD
);

export const scheduleRoutes = router;
