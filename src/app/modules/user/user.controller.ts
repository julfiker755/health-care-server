import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.service";


const insertAdminBD=catchAsync(async(req:Request,res:Response)=>{
    const result= await userService.insertAdminBD(req.file,req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Admin created successfully",
      data:result
    })
 })


 export const userController={
    insertAdminBD
 }