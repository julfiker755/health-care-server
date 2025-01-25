import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { patientService } from "./patient.service";
import { authProps } from "../../../types";
import httpStatus from "http-status";






const updateProfileBD=catchAsync(async(req:Request & {user?:authProps},res:Response)=>{
    const user=req.user
    const result= await patientService.updateProfileBD(user,req.file,req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Profile Update successfully",
      data:result
    })
 })


 export const patientController={
    updateProfileBD
 }