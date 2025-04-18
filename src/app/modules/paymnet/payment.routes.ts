import express from "express";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import { paymentController } from "./payment.controller";
const router = express.Router();



// router.post("/", authController.loginAuth);
// router.post("/refresh-token", authController.refreshToken);
// router.post(
//   "/change-password",
//   auth(userRole.SUPER_ADMIN, userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT),
//   authController.changePassword
// );
router.get("/success", paymentController.paymentGetBD)
router.post("/store", paymentController.paymentStoreBD)



export const paymentRoutes = router;
