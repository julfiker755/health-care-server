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


export const authController={
    loginAuth,
    refreshToken
}