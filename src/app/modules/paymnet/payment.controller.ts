import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";


const paymentGetBD = catchAsync(
  async (req: Request, res: Response) => {
    const result = await paymentService.paymentGetBD(req.query.id as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment Info successfully",
      data: result,
    });
  }
);
const paymentStoreBD = catchAsync(
  async (req: Request, res: Response) => {
    const result = await paymentService.paymentStoreBD(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment Store successfully",
      data: result,
    });
  }
);



export const paymentController = {
    paymentGetBD,
    paymentStoreBD
};
