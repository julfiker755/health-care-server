import { appointmentService } from "./appointment.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { authProps } from "../../../types";




const myAppointmentDB = catchAsync(async (req: Request & {user?:authProps}, res: Response) => {
    const user=req.user
    const result = await appointmentService.myAppointmentDB(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment Info Successfully",
      data: result,
    });
  });
const appointmentGetDB = catchAsync(async (req: Request & {user?:authProps}, res: Response) => {
    const user=req.user
    const result = await appointmentService.appointmentGetDB(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment Info Successfully",
      data: result,
    });
  });

const appointmentStoreDB = catchAsync(async (req: Request & {user?:authProps}, res: Response) => {
    const user=req.user
    const result = await appointmentService.appointmentStoreDB(user,req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment Store Successfully",
      data: result,
    });
  });



export const appointmentController = {
    appointmentGetDB,
    myAppointmentDB,
    appointmentStoreDB
};
