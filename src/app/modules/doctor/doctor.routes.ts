import express, { NextFunction, Request, Response } from "express";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import { fileUploader } from "../../../shared/fileUploader";
import { doctorController } from "./doctor.controller";
const router = express.Router();

router.get("/", doctorController.getIntoBD);
router.get("/:id", doctorController.getSingleBD);

router.delete(
  "/:id",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN),
  doctorController.deleteIntoBD
);

router.delete(
  "/soft/:id",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN),
  doctorController.softDeleteBD
);

router.post(
  "/specialities-store",
  auth(userRole.SUPER_ADMIN, userRole.DOCTOR),
  doctorController.specialitieStoreBD
);

router.get(
  "/specialities/collect",
  auth(userRole.SUPER_ADMIN, userRole.DOCTOR),
  doctorController.specialitieGetBD
);
router.delete(
  "/specialities/remove/:id",
  auth(userRole.SUPER_ADMIN, userRole.DOCTOR),
  doctorController.specialitieDeleteBD
);
router.get(
  "/my-schedule/collect",
  auth(userRole.SUPER_ADMIN,userRole.DOCTOR),
  doctorController.scheduleGetBD
);
router.post(
  "/schedule-store",
  auth(userRole.SUPER_ADMIN, userRole.DOCTOR),
  doctorController.scheduleStoreBD
);
router.delete(
  "/schedule/remove/:id",
  auth(userRole.SUPER_ADMIN, userRole.DOCTOR),
  doctorController.scheduleDeleteBD
);
router.put(
  "/update",
  auth(userRole.SUPER_ADMIN, userRole.DOCTOR),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return doctorController.updateProfileBD(req, res, next);
  }
);

export const doctorRoutes = router;
