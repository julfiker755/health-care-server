"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHander = (err, req, res, next) => {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        message = "Validation Error";
        error = err.message;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            message = "Duplicate Key error";
            error = err.meta;
        }
    }
    res.status(statusCode).json({
        success: success,
        message: message || "Something went wrong",
        errors: error,
    });
};
exports.default = globalErrorHander;
// import { Prisma } from "@prisma/client"
// import { NextFunction, Request, Response } from "express"
// import httpStatus from "http-status"
// const globalErrorHander=(err:any,req:Request,res:Response,next:NextFunction)=>{
//          if(err instanceof Prisma.PrismaClientValidationError){
//             console.log("Validation Error")
//          }
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//           success:false,
//           message:err.message || "Something went wrong",
//           error:err,
//         })
//     }
//     export default globalErrorHander
