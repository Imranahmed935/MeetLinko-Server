import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { reviewsService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewsService.createReview(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review Created Successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
};
