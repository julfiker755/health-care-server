"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialitiesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const specialities_controller_1 = require("./specialities.controller");
const fileUploader_1 = require("../../../shared/fileUploader");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", specialities_controller_1.specialitiesController.storeGetBD);
router.delete("/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), specialities_controller_1.specialitiesController.deleteSpceialitiesBD);
router.post("/store", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return specialities_controller_1.specialitiesController.storeSpceialitiesBD(req, res, next);
});
router.put("/update/:id", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return specialities_controller_1.specialitiesController.updateSpceialitiesBD(req, res, next);
});
exports.specialitiesRoutes = router;
