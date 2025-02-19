import express from "express";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import { scheduleController } from "./schedule.controller";
const router = express.Router();

router.get(
  "/",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN),
  scheduleController.getIntoBD
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
