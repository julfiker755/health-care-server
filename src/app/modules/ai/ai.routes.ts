import express from "express";
import { aiController } from "./ai.controller";
const router = express.Router();


router.post(
  "/chatgpt",
  aiController.chatgptFetch
);

export const aiRoutes = router;
