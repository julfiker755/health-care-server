import express, { NextFunction, Request, Response } from "express";
import { specialitiesController } from "./specialities.controller";
import { fileUploader } from "../../../shared/fileUploader";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
const router = express.Router();




router.get("/", specialitiesController.storeGetBD);
router.delete(
  "/:id",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN),
  specialitiesController.deleteSpceialitiesBD
);

router.post(
  "/store",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return specialitiesController.storeSpceialitiesBD(req, res, next);
  }
);

router.put(
  "/update/:id",
  auth(userRole.SUPER_ADMIN, userRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return specialitiesController.updateSpceialitiesBD(req, res, next);
  }
);

export const specialitiesRoutes = router;
