"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), user_controller_1.userController.getIntoBD);
router.post("/admin-store", (0, validateRequest_1.default)(user_validation_1.userValidation.adminSchema), user_controller_1.userController.insertAdminBD);
router.post("/doctor-store", (0, validateRequest_1.default)(user_validation_1.userValidation.doctorSchema), user_controller_1.userController.insertDoctorBD);
router.post("/patient-store", (0, validateRequest_1.default)(user_validation_1.userValidation.patientSchema), user_controller_1.userController.insertPatientBD);
router.get("/my-profile", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN, client_1.userRole.DOCTOR, client_1.userRole.PATIENT), user_controller_1.userController.getMyProfileBD);
exports.userRoutes = router;
