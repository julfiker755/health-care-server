import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";
import { Request, Response } from "express";
import httpStatus from "http-status";




const insertAdminBD=catchAsync(async(req:Request,res:Response)=>{
    const result= await userService.insertAdminBD(req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Admin created successfully",
      data:result
    })
 })


const insertDoctorBD=catchAsync(async(req:Request,res:Response)=>{
    const result= await userService.insertDoctorBD(req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Doctor created successfully",
      data:result
    })
 })


const insertPatientBD=catchAsync(async(req:Request,res:Response)=>{
    const result= await userService.insertPatientBD(req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Patient created successfully",
      data:result
    })
 })


 export const userController={
    insertAdminBD,
    insertDoctorBD,
    insertPatientBD
 }