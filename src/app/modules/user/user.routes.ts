import express, {NextFunction, Request, Response } from 'express'
import { userController } from './user.controller'
import { fileUploader } from '../../../shared/fileUploader'



const router = express.Router()



router.post("/store-admin",
fileUploader.upload.single("file"),
(req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data)
    return userController.insertAdminBD(req,res,next)
 }
)







export const userRoutes = router 