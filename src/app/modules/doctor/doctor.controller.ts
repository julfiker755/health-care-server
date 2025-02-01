import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authProps, paginationField } from "../../../types";
import httpStatus from "http-status";
import { doctorService } from "./doctor.service";
import pink from "../../../shared/pink";



const getIntoBD=catchAsync(async(req:Request,res:Response)=>{
   const filters=pink(req.query,["search","name","email","address","gender"])
    const options=pink(req.query,paginationField)
    const result= await doctorService.getIntoBD(filters,options)
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

 const deleteIntoBD=catchAsync(async(req:Request,res:Response)=>{
   const {id}=req.params
    const result= await doctorService.deleteIntoBD(id)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Admin delete successfully",
       data:result
    })
 })

 const softDeleteBD=catchAsync(async(req:Request,res:Response)=>{
   const {id}=req.params
    const result= await doctorService.softDeleteBD(id)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Admin soft delete successfully",
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
   getIntoBD,
   deleteIntoBD,
   softDeleteBD,
   updateProfileBD
 }