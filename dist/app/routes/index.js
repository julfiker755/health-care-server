"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ai_routes_1 = require("../modules/ai/ai.routes");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const doctor_routes_1 = require("../modules/doctor/doctor.routes");
const patient_routes_1 = require("../modules/patient/patient.routes");
const specialities_routes_1 = require("../modules/specialities/specialities.routes");
const schedule_routes_1 = require("../modules/schedule/schedule.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.authRoutes
    }, {
        path: '/user',
        route: user_routes_1.userRoutes
    }, {
        path: '/admin',
        route: admin_routes_1.adminRoutes
    }, {
        path: '/doctor',
        route: doctor_routes_1.doctorRoutes
    }, {
        path: '/patient',
        route: patient_routes_1.patientRoutes
    }, {
        path: "/specialities",
        route: specialities_routes_1.specialitiesRoutes
    }, {
        path: "/schedule",
        route: schedule_routes_1.scheduleRoutes
    }, {
        path: "/ai",
        route: ai_routes_1.aiRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
