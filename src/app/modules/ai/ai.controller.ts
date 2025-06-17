import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { aiService } from "./ai.service";


const GeminiAi=catchAsync(async(req:Request,res:Response)=>{
    const result= await aiService.GeminiAi(req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Ai successfull",
      data:result
    })
 })



 export const aiController={
  GeminiAi,
 }