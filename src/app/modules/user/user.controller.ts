import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req);
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"User Created Successfully!!",
    data:result
  })
});

const userGetById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await userService.userGetById(id);
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"User retrived Successfully!!",
    data:result
  })
});


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, interest } = req.query;

  const filters: {
    interest?: string;
    page: number;
    limit: number;
  } = {
    page: Number(page),
    limit: Number(limit),
  };

  if (interest && typeof interest === "string") {
    filters.interest = interest;
  }

  const result = await userService.getAllUsers(filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});


const getTopTraveler = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getTopTraveler();
  console.log(result)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Top rated travelers retrieved successfully!",
    data: result,
  });
});





export const  userController ={
    createUser,
    userGetById,
   getTopTraveler,
    getAllUsers
 
}