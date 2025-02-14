import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { aiService } from "./ai.service";




 const chatgptFetch=catchAsync(async(req:Request,res:Response)=>{
    const result= await aiService.chatgptFetch(req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Ai successfull",
      data:result
    })
 })



 export const aiController={
   chatgptFetch,
 }