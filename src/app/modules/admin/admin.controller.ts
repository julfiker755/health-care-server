import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { adminService } from "./admin.service";
import { authProps } from "../../../types";
import httpStatus from "http-status";



const getProfileBD=catchAsync(async(req:Request & {user?:authProps},res:Response)=>{
    const user=req.user
    const result= await adminService.getProfileBD(user)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Profile info successfully",
      data:result
    })
 })



const updateProfileBD=catchAsync(async(req:Request & {user?:authProps},res:Response)=>{
    const user=req.user
    const result= await adminService.updateProfileBD(user,req.file,req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Profile Update successfully",
      data:result
    })
 })


 export const adminController={
    getProfileBD,
    updateProfileBD
 }