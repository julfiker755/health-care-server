"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const fileUploader_1 = require("../../../shared/fileUploader");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), admin_controller_1.adminController.getIntoBD);
router.delete("/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), admin_controller_1.adminController.deleteIntoBD);
router.delete("/soft/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), admin_controller_1.adminController.softDeleteBD);
router.put("/update", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return admin_controller_1.adminController.updateProfileBD(req, res, next);
});
exports.adminRoutes = router;
