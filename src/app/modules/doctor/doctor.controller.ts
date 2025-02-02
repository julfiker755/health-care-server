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
      message:"Doctor Info successfully",
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
      message:"Doctor delete successfully",
       data:result
    })
 })

 const softDeleteBD=catchAsync(async(req:Request,res:Response)=>{
   const {id}=req.params
    const result= await doctorService.softDeleteBD(id)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Doctor soft delete successfully",
       data:result
    })
 })

 const specialitieStoreBD=catchAsync(async(req:Request & {user?:authProps},res:Response)=>{
    const user=req.user
    const result= await doctorService.specialitieStoreBD(user,req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Doctor specialitie create successfully",
       data:result
    })
 })

 const specialitieGetBD=catchAsync(async(req:Request & {user?:authProps},res:Response)=>{
    const user=req.user
    const result= await doctorService.specialitieGetBD(user)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Doctor specialities info successfully",
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
   updateProfileBD,
   specialitieStoreBD,
   specialitieGetBD
 }