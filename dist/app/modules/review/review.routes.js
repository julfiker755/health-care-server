"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.get("/", review_controller_1.reviewController.getReviewBD);
router.post("/store", (0, auth_1.default)(client_1.userRole.PATIENT), review_controller_1.reviewController.storeReviewBD);
router.delete("/:id", (0, auth_1.default)(client_1.userRole.PATIENT), review_controller_1.reviewController.deleteReviewBD);
router.put("/:id", (0, auth_1.default)(client_1.userRole.PATIENT), review_controller_1.reviewController.updateReviewBD);
exports.reviewRoutes = router;
