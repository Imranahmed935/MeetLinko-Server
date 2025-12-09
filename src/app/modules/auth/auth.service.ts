import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelper } from "../../helper/jwtHelper";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs"
import httpStatus from "http-status"

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });

  const checkPass = await bcrypt.compare(payload.password, user.password);
  if (!checkPass) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password is incorrect!");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role, id:user.id},
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    "abcdefgh",
    "90d"
  );

  return {
    accessToken,
    refreshToken,
  };
};

// const getMe = async (cookies: any) => {
//   const accessToken = cookies.accessToken;

//   if (!accessToken) {
//     throw new ApiError(401, "Access Token not found");
//   }

//   const decodedData = jwtHelper.verifyToken(
//     accessToken,
//     config.jwt.jwt_secret as Secret
//   );

//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: decodedData.email,
//     },
//     select: {
//       id: true,
//       fullName:true,
//       email: true,
//       role: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   console.log("User Data:", userData);
//   return userData;
// };

const getMe = async (cookies: any) => {
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "Access Token not found");
  }

  const decodedData = jwtHelper.verifyToken(
    accessToken,
    config.jwt.jwt_secret as Secret
  );

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  return userData;
};


export const authService =  {
    login,
    getMe
}