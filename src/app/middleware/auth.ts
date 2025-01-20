import { NextFunction, Request, Response } from "express"
import { jwtHelpers } from "../../helpers/jwtHelpers"
import ApiError from "../errors/ApiError"
import httpStatus from "http-status"
import { Secret } from "jsonwebtoken"
import config from "../config"



const auth=(...roles:string[])=>{
    return async(req:Request & {user?:any},res:Response,next:NextFunction)=>{
        try{
            const token=req.headers.authorization
            if(!token){
                throw new ApiError(httpStatus.UNAUTHORIZED,"You are not authorized")
            }
            const varifyToken=jwtHelpers.varifyToken(token,config.jwt.secret as Secret)

            req.user=varifyToken
            
            if(roles?.length && !roles.includes(varifyToken.role)){
                throw new ApiError(httpStatus.FORBIDDEN,"Forbidden")
            }
            next()
           
        }catch(err){
          next(err)
        }
    }
}

export default auth