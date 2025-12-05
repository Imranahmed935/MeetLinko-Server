import { Request } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { fileUploader } from "../../helper/imageUpload";

const createUser = async (req: Request) => {
  let profileImageUrl: string | undefined;
  

  if (req.file) {
    const uploadResult = await fileUploader.uploadCloudinary(req.file);
    profileImageUrl = uploadResult?.secure_url;
  }

  const {
    fullName,
    email,
    password,
    bio,
    travelInterests,
    visitedCountries,
    currentLocation,
    role,
  } = req.body.user || req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await prisma.$transaction(async (tnx :any) => {
    return await tnx.user.create({
      data: {
        fullName,
        email,
        password: hashPassword,
        profileImage: profileImageUrl ?? null,
        bio: bio ?? null,
        travelInterests: travelInterests ?? [],
        visitedCountries: visitedCountries ?? [],
        currentLocation: currentLocation ?? null,
        role: role ?? "USER",
      },
    });
  });

  return result;
};

const userGetById = async (id: any) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};


const updateUser = async (payload:any, id: any) => {
  const {password, ...payloadInfo} = payload;
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: payloadInfo,
  });

  return result;
};

export const userService = {
  createUser,
  userGetById,
  updateUser,
};
