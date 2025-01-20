import express, {NextFunction, Request, Response } from 'express'
import auth from '../../middleware/auth'
import { userRole } from '@prisma/client'
import { fileUploader } from '../../../shared/fileUploader'
import { doctorController } from './doctor.controller'
const router = express.Router()


router.get("/my-profile",auth(userRole.SUPER_ADMIN,userRole.DOCTOR), doctorController.getProfileBD)

router.put("/update",
    auth(userRole.SUPER_ADMIN,userRole.DOCTOR),
    fileUploader.upload.single("file"),
    (req:Request,res:Response,next:NextFunction)=>{
        req.body=JSON.parse(req.body.data)
        return doctorController.updateProfileBD(req,res,next)
     }
    )


export const doctorRoutes = router