import express, {NextFunction, Request, Response } from 'express'
import { adminController } from './admin.controller'
import auth from '../../middleware/auth'
import { userRole } from '@prisma/client'
import { fileUploader } from '../../../shared/fileUploader'
const router = express.Router()


router.get("/my-profile",auth(userRole.SUPER_ADMIN,userRole.ADMIN), adminController.getProfileBD)
router.put("/update",
    auth(userRole.SUPER_ADMIN,userRole.ADMIN),
    fileUploader.upload.single("file"),
    (req:Request,res:Response,next:NextFunction)=>{
        req.body=JSON.parse(req.body.data)
        return adminController.updateProfileBD(req,res,next)
     }
    )


export const adminRoutes = router