"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const schedule_controller_1 = require("./schedule.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN, client_1.userRole.DOCTOR), schedule_controller_1.scheduleController.getIntoBD);
router.post("/store", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), schedule_controller_1.scheduleController.storeScheduleBD);
router.delete("/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), schedule_controller_1.scheduleController.deleteScheduleBD);
exports.scheduleRoutes = router;
