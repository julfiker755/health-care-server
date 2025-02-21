import express from "express";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import { reviewController } from "./review.controller";
const router = express.Router();

router.get("/", reviewController.getReviewBD);
router.post("/store", auth(userRole.PATIENT), reviewController.storeReviewBD);
router.delete("/:id", auth(userRole.PATIENT), reviewController.deleteReviewBD);
router.put("/:id", auth(userRole.PATIENT), reviewController.updateReviewBD);

export const reviewRoutes = router;
