import express, {NextFunction, Request, Response } from 'express'
import { userController } from './user.controller'
import { fileUploader } from '../../../shared/fileUploader'
import { userValidation } from './user.validation'
import catchAsync from '../../../shared/catchAsync'



const router = express.Router()



router.post("/store-admin",
fileUploader.upload.single("file"),
 catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    req.body=userValidation.adminSchema.parse(JSON.parse(req.body.data))
    return userController.insertAdminBD(req,res,next)
 })
)







export const userRoutes = router 