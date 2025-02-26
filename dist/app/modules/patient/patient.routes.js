"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fileUploader_1 = require("../../../shared/fileUploader");
const patient_controller_1 = require("./patient.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.DOCTOR, client_1.userRole.ADMIN), patient_controller_1.patientController.getIntoBD);
router.delete("/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.DOCTOR), patient_controller_1.patientController.deleteIntoBD);
router.delete("/soft/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.DOCTOR), patient_controller_1.patientController.softDeleteBD);
router.put("/update", (0, auth_1.default)(client_1.userRole.PATIENT), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return patient_controller_1.patientController.updateProfileBD(req, res, next);
});
exports.patientRoutes = router;
