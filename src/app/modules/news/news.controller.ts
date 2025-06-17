import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pink from "../../../shared/pink";
import { paginationField } from "../../../types";
import { newsService } from "./news.service";



const getAllNews=catchAsync(async(req:Request,res:Response)=>{
  const options=pink(req.query,paginationField)
    const result= await newsService.getAllNews(options)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"news get successfully",
      meta:{
        page:result.page,
        limit:result.limit,
        total:result.total
      },
      data:result.data
    })
 })

const newsStore=catchAsync(async(req:Request,res:Response)=>{
    const result= await newsService.newsStore(req.body,req.file)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"News Store successfully",
      data:result
    })
 })

 const singleNews=catchAsync(async(req:Request,res:Response)=>{
  const {id}=req.params
  const result=await newsService.singleNews(id)
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Single news get successfully",
    data:result
  })
 })

 const newsDelete=catchAsync(async(req:Request,res:Response)=>{
  const {id}=req.params
  const result=await newsService.newsDelete(id)
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"News Delete successfully",
    data:result
  })
 })

 const updateNews=catchAsync(async(req:Request,res:Response)=>{
  const {id}=req.params
  const result=await newsService.updateNews(id,req.body)
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"News Update successfully",
    data:result
  })
 })


 export const newsController={
  getAllNews,
  newsStore,
  singleNews,
  newsDelete,
  updateNews
 }