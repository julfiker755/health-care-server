import express, { NextFunction, Request, Response } from "express";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import { scheduleController } from "./schedule.controller";
const router = express.Router();




// router.get("/", specialitiesController.storeGetBD);
router.post("/store",scheduleController.storeScheduleBD)
// router.delete(
//   "/:id",
//   auth(userRole.SUPER_ADMIN, userRole.ADMIN),
//   specialitiesController.deleteSpceialitiesBD
// );





export const scheduleRoutes = router;
