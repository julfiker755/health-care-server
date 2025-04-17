import express from "express";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import { appointmentController } from "./appointment.controller";
const router = express.Router();

router.get(
  "/my-appointent",
  auth(userRole.PATIENT),
  appointmentController.myAppointmentDB
);
router.get(
  "/doctor",
  auth(userRole.DOCTOR),
  appointmentController.appointmentGetDB
);
router.get(
  "/:id",
  auth(userRole.DOCTOR,userRole.PATIENT),
  appointmentController.appointmentSingleDB
);

router.post(
  "/store",
  auth(userRole.PATIENT),
  appointmentController.appointmentStoreDB
);

export const appointmentRoutes = router;
