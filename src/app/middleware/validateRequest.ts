import { NextFunction, Request, Response } from "express"
import { AnyZodObject,ZodError  } from "zod"
import httpStatus from "http-status";

const validateRequest=(schema:AnyZodObject)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
         try{
            await schema.parseAsync(req.body)
             next()
         }catch(err){
             if (err instanceof ZodError){
                const formattedErrors = err.errors.map((issue) => ({
                  field: issue.path.join("."),
                  code: issue.code, 
                  message: issue.message,
                }));

                res.status(httpStatus.BAD_REQUEST).json({
                  success:false,
                  message: "Validation failed. Check your sent data",
                  errors: formattedErrors,
                });
                return;
             }
             next(err)
         }
     }
 }


 export default validateRequest

