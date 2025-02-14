import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { doctorRoutes } from "../modules/doctor/doctor.routes";
import { patientRoutes } from "../modules/patient/patient.routes";
import { specialitiesRoutes } from "../modules/specialities/specialities.routes";



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
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))


export default router