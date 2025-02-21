import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { reviewService } from "./review.service";
import httpStatus from "http-status";

const getReviewBD = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.getReviewBD();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Info successfull",
    data: result,
  });
});
const storeReviewBD = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.storeReviewBD(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review store successfull",
    data: result,
  });
});

const deleteReviewBD = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.deleteReviewBD(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "review delete successfully",
    data: result,
  });
});
const updateReviewBD = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.updateReviewBD(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "review update successfully",
    data: result,
  });
});

export const reviewController = {
  getReviewBD,
  storeReviewBD,
  deleteReviewBD,
  updateReviewBD,
};
