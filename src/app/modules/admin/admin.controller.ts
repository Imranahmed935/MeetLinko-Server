import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { adminService } from "./admin.service";


const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllUser();
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:"User retrived Successfully!!",
    data:result
  })
});

const getAllTravelPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllTravelPlan();
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:"All Travel Plan retrived Successfully!!",
    data:result
  })
});

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllReview();
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:"All Review retrived Successfully!!",
    data:result
  })
});


export const adminController ={
    getAllUser,
    getAllTravelPlan,
    getAllReview
}