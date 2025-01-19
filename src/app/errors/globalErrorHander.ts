import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHander = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientValidationError) {
    console.log("Validation Error");
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Something went wrong",
    error: err,
  });
};

export default globalErrorHander;
