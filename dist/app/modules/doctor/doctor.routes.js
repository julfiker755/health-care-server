"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const fileUploader_1 = require("../../../shared/fileUploader");
const doctor_controller_1 = require("./doctor.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), doctor_controller_1.doctorController.getIntoBD);
router.get("/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), doctor_controller_1.doctorController.getSingleBD);
router.delete("/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), doctor_controller_1.doctorController.deleteIntoBD);
router.delete("/soft/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), doctor_controller_1.doctorController.softDeleteBD);
router.post("/specialities-store", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.DOCTOR), doctor_controller_1.doctorController.specialitieStoreBD);
router.get("/specialities", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.DOCTOR), doctor_controller_1.doctorController.specialitieGetBD);
router.put("/update", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.DOCTOR), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return doctor_controller_1.doctorController.updateProfileBD(req, res, next);
});
exports.doctorRoutes = router;
