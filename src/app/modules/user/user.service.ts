import { Request } from "express";
import bcrypt from "bcryptjs"
import { prisma } from "../../shared/prisma";


const createUser = async (req: Request) => {
  const userInfo = req.body;
  const hashPassword = await bcrypt.hash(userInfo.password, 10);

  const result = await prisma.$transaction(async (tnx:any) => {
    return await tnx.user.create({
      data:{
        ...userInfo,
        password:hashPassword
      }
    });
  });

  return result;
};

export const userService = {
    createUser
}
