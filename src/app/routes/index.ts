import express from "express";
import { aiRoutes } from "../modules/ai/ai.routes";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { doctorRoutes } from "../modules/doctor/doctor.routes";
import { patientRoutes } from "../modules/patient/patient.routes";
import { specialitiesRoutes } from "../modules/specialities/specialities.routes";
import { scheduleRoutes } from "../modules/schedule/schedule.routes";


const router=express.Router()



const moduleRoutes=[
    {
        path:'/auth',
        route:authRoutes
    },{
        path:'/user',
        route:userRoutes
    },{
        path:'/admin',
        route:adminRoutes
    },{
        path:'/doctor',
        route:doctorRoutes
    },{
        path:'/patient',
        route:patientRoutes
    },{
        path:"/specialities",
        route:specialitiesRoutes
    },{
        path:"/schedule",
        route:scheduleRoutes
    },{
        path:"/ai",
        route:aiRoutes
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))


export default router