import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { travelPlanService } from "./travelPlan.service";

const createPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await travelPlanService.createPlan(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travel Plan created Successfully!",
    data: result,
  });
});

const getAllTravelPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await travelPlanService.getAllTravelPlan();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Travel Plan Retrived Successfully!",
    data: result,
  });
});

const updatePlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await travelPlanService.updatePlan(req.body, id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travel Plan Updated Successfully!",
    data: result,
  });
});

export const travelPlanController = {
  createPlan,
  getAllTravelPlan,
  updatePlan,
};
