import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { adminService } from "./admin.service";
import { authProps, paginationField } from "../../../types";
import httpStatus from "http-status";
import pink from "../../../shared/pink";
import { adminSearchField } from "./admin.constant";





const getIntoBD=catchAsync(async(req:Request,res:Response)=>{
   const filters=pink(req.query,["search","name","email","address","gender"])
    const options=pink(req.query,paginationField)
    const result= await adminService.getIntoBD(filters,options)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Admin Info successfully",
      meta:{
         page:result.page,
         limit:result.limit,
         total:result.total
       },
       data:result.data
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
    getIntoBD,
    updateProfileBD
 }