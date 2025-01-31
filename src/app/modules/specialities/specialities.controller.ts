import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authProps, paginationField} from "../../../types";
import httpStatus from "http-status";
import { specialitiesService } from "./specialities.service";
import pink from "../../../shared/pink";

const storeGetBD = catchAsync(async (req: Request, res: Response) => {
   const filters=pink(req.query,["search"])
   const options=pink(req.query,paginationField)
  const result = await specialitiesService.storeGetBD(filters,options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties Info successfully",
    meta:{
      page:result.page,
      limit:result.limit,
      total:result.total
    },
    data:result.data
  });
});


const storeSpceialitiesBD = catchAsync(async (req: Request, res: Response) => {
  const result = await specialitiesService.storeSpceialitiesBD(req.file,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties store successfully",
    data: result,
  });
});


const deleteSpceialitiesBD = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await specialitiesService.deleteSpceialitiesBD(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties delete successfully",
    data: result,
  });
});


const updateSpceialitiesBD = catchAsync(
  async (req: Request & { user?: authProps }, res: Response) => {
    const {id}=req.params
    const result = await specialitiesService.updateSpceialitiesBD(req.file,req.body,id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Spceialities Update successfully",
      data: result,
    });
  }
);

export const specialitiesController = {
  storeGetBD,
  updateSpceialitiesBD,
  storeSpceialitiesBD,
  deleteSpceialitiesBD,
};
