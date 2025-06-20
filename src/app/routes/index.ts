import express from "express";
import { aiRoutes } from "../modules/ai/ai.routes";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { doctorRoutes } from "../modules/doctor/doctor.routes";
import { patientRoutes } from "../modules/patient/patient.routes";
import { specialitiesRoutes } from "../modules/specialities/specialities.routes";
import { scheduleRoutes } from "../modules/schedule/schedule.routes";
import { appointmentRoutes } from "../modules/appointment/appointment.routes";
import { paymentRoutes } from "../modules/paymnet/payment.routes";
import { newsRoutes } from "../modules/news/news.routes";


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
    },{
        path:"/appointment",
        route:appointmentRoutes
    },{
        path:"/payment",
        route:paymentRoutes
    },{
        path:"/news",
        route:newsRoutes
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))


export default router