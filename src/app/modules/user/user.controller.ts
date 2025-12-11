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
  const {id} = req.params;
  const result = await userService.getAllUsers(id as string);
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"User retrived Successfully!!",
    data:result
  })
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await userService.updateUser(req, id as string) ;
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"Profile Updated Successfully!!",
    data:result
  })
});




export const  userController ={
    createUser,
    userGetById,
    updateUser,
    getAllUsers
 
}