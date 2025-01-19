import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { z } from "zod";


// This is a higher-order function
const catchAsync = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

      
        res.status(httpStatus.BAD_REQUEST).json({
          status: "error",
          message: "Validation failed",
          errors: formattedErrors,
        });
      } else {
        next(err);
      }
    }
  };
};

export default catchAsync;
