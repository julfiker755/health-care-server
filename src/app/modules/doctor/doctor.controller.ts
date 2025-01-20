import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authProps } from "../../../types";
import httpStatus from "http-status";
import { doctorService } from "./doctor.service";



const getProfileBD=catchAsync(async(req:Request & {user?:authProps},res:Response)=>{
    const user=req.user
    const result= await doctorService.getProfileBD(user)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Profile info successfully",
      data:result
    })
 })



const updateProfileBD=catchAsync(async(req:Request & {user?:authProps},res:Response)=>{
    const user=req.user
    const result= await doctorService.updateProfileBD(user,req.file,req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Profile Update successfully",
      data:result
    })
 })


 export const doctorController={
    getProfileBD,
    updateProfileBD
 }