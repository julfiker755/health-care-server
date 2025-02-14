import catchAsync from "../../../shared/catchAsync";
import pink from "../../../shared/pink";
import sendResponse from "../../../shared/sendResponse";
import { authProps, paginationField } from "../../../types";
import { userService } from "./user.service";
import { Request, Response } from "express";
import httpStatus from "http-status";



const getIntoBD = catchAsync(
  async (req: Request, res: Response) => {
    const filters=pink(req.query,["search"])
    const options=pink(req.query,paginationField)
    const result = await userService.getIntoBD(filters,options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User info successfully",
      meta:{
        page:result.page,
        limit:result.limit,
        total:result.total
      },
      data:result.data,
    });
  }
);

const getMyProfileBD = catchAsync(
  async (req: Request & { user?: authProps }, res: Response) => {
    const result = await userService.getMyProfileBD(req.user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile info successfully",
      data: result,
    });
  }
);

const insertAdminBD = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.insertAdminBD(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const insertDoctorBD = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.insertDoctorBD(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});

const insertPatientBD = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.insertPatientBD(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});

export const userController = {
  getIntoBD,
  getMyProfileBD,
  insertAdminBD,
  insertDoctorBD,
  insertPatientBD,
};
