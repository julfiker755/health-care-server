import express, {NextFunction, Request, Response } from 'express'
import { fileUploader } from '../../../shared/fileUploader'
import { patientController } from './patient.controller'
import auth from '../../middleware/auth'
import { userRole } from '@prisma/client'
const router = express.Router()


router.get("/my-profile",auth(userRole.SUPER_ADMIN,userRole.PATIENT), patientController.getProfileBD)

router.put("/update",
    auth(userRole.SUPER_ADMIN,userRole.PATIENT),
    fileUploader.upload.single("file"),
    (req:Request,res:Response,next:NextFunction)=>{
        req.body=JSON.parse(req.body.data)
        return patientController.updateProfileBD(req,res,next)
     }
    )


export const patientRoutes = router