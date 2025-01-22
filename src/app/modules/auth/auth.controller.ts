import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";



const loginAuth=catchAsync(async(req:Request,res:Response)=>{
    const result=await authService.loginAuth(req.body)
    const {refreshToken}=result
    res.cookie("refreshToken",refreshToken,{secure:false,httpOnly:true})
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User logged in successfully",
        data:{
            accessToken:result.accessToken,
            needPasswordChange:result.needPasswordChange
        }
    })
})



const refreshToken=catchAsync(async(req:Request,res:Response)=>{
    const {refreshToken}=req.cookies
    const result=await authService.refreshToken(refreshToken)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User logged in successfully",
        data:result
    })
})


const changePassword=catchAsync(async(req:Request & {user?:any},res:Response)=>{
    const result=await authService.changePassword(req.user,req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Password change successfully",
        data:result
    })
})


const forgotPassword=catchAsync(async(req:Request,res:Response)=>{
    await authService.forgotPassword(req.body.email)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Please check your email",
        data:null
    })
})


export const authController={
    loginAuth,
    refreshToken,
    changePassword,
    forgotPassword
}