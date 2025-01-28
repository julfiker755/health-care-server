import { NextFunction, Request, RequestHandler, Response } from "express";
import ApiCustomError from "../app/errors/ApiCustomError";
import httpStatus from "http-status";




// This is a higher-order function
const catchAsync = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (err: any) {
      if (err instanceof ApiCustomError){
        res.status(httpStatus.BAD_REQUEST).json({
          message: "Validation failed. Check your sent data",
          errors:err.customErrors || [],
        });
        return;
      } else {
        next(err);
      }
    }
  };
};

export default catchAsync;
