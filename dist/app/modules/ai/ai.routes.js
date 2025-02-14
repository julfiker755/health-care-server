"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ai_controller_1 = require("./ai.controller");
const router = express_1.default.Router();
router.post("/chatgpt", ai_controller_1.aiController.chatgptFetch);
exports.aiRoutes = router;
