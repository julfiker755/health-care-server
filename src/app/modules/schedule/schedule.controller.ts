import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authProps, paginationField} from "../../../types";
import httpStatus from "http-status";
import pink from "../../../shared/pink";
import { scheduleService } from "./schedule.service";



const storeScheduleBD = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.storeScheduleBD(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule store successfull",
    data: result,
  });
});


// const deleteSpceialitiesBD = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await specialitiesService.deleteSpceialitiesBD(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Specialties delete successfully",
//     data: result,
//   });
// });




export const scheduleController = {
    storeScheduleBD
};
