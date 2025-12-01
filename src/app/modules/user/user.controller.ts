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
  console.log(id)
  const result = await userService.userGetById(id);
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"User retrived Successfully!!",
    data:result
  })
});


export const  userController ={
    createUser,
    userGetById
}