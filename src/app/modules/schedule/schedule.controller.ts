import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {paginationField } from "../../../types";
import httpStatus from "http-status";
import pink from "../../../shared/pink";
import { scheduleService } from "./schedule.service";

const getIntoBD = catchAsync(async (req: Request, res: Response) => {
  const filters = pink(req.query, ["status","search"]);
  const options = pink(req.query, paginationField);
  const result = await scheduleService.getIntoBD(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Info successfull",
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
    },
    data: result.data,
  });
});

const storeScheduleBD = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.storeScheduleBD(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule store successfull",
    data: result,
  });
});

const deleteScheduleBD = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await scheduleService.deleteScheduleBD(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "schedule delete successfully",
    data: result,
  });
});

export const scheduleController = {
  getIntoBD,
  storeScheduleBD,
  deleteScheduleBD
};
