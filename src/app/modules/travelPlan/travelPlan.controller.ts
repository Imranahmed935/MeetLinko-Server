import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { travelPlanService } from "./travelPlan.service";
import { IJWTPayload } from "../../type/common";



const createPlan = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
 const hostId = req.user?.id
 console.log(hostId)
  const result = await travelPlanService.createPlan(req.body, hostId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travel Plan created Successfully!",
    data: result,
  });
});

const getMyTravelPlan = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await travelPlanService.getMyTravelPlan(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My Travel Plan retrived Successfully!",
    data: result,
  });
});




// const getAllTravelPlan = catchAsync(async (req: Request, res: Response) => {
//   const result = await travelPlanService.getAllTravelPlan();
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "All Travel Plans Retrieved Successfully!",
//     data: result,
//   });
// });

const getAllTravelPlan = catchAsync(async (req: Request, res: Response) => {
  const { destination, startDate, endDate, page = "1", limit = "10" } = req.query;

  const filters: {
    destination?: string;
    startDate?: string;
    endDate?: string;
  } = {};

  if (destination && typeof destination === "string") filters.destination = destination;
  if (startDate && typeof startDate === "string") filters.startDate = startDate;
  if (endDate && typeof endDate === "string") filters.endDate = endDate;

  const pagination = {
    page: Number(page),
    limit: Number(limit),
  };

  const result = await travelPlanService.getAllTravelPlan(filters, pagination);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Filtered Travel Plans Retrieved Successfully!",
    data: result.data,
    meta: result.meta,
  });
});




const getTravelPlanById = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await travelPlanService.getTravelPlanById(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travel Plan Retrived Successfully!",
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


const deletePlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await travelPlanService.deletePlan(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travel Plan Deleted Successfully!",
    data: result,
  });
});

export const travelPlanController = {
  createPlan,
  getAllTravelPlan,
  updatePlan,
  deletePlan,
  getTravelPlanById,
  getMyTravelPlan
};
