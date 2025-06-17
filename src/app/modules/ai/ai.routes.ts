import express from "express";
import { aiController } from "./ai.controller";
const router = express.Router();


router.post(
  "/gemeni",
  aiController.GeminiAi
);

export const aiRoutes = router;
