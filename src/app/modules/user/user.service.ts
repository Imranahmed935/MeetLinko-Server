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
    travelInterests,
    visitedCountries,
    currentLocation,
    role,
  } = req.body.user || req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await prisma.$transaction(async (tnx: any) => {
    return await tnx.user.create({
      data: {
        fullName,
        email,
        password: hashPassword,
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
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  return result;
};


const getAllUsers = async (filters: { page: number; limit: number; interest?: string }) => {
  const { page, limit, interest } = filters;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (interest) {
    where.travelInterests = {
      has: interest, 
    };
  }

  const users = await prisma.user.findMany({
    where,
    skip,
    take: limit,
  });

  const total = await prisma.user.count({ where });

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};



const updateUser = async (req: Request, id: string) => {
  let profileImageUrl: string | undefined;

  if (req.file) {
    const uploadResult = await fileUploader.uploadCloudinary(req.file);
    profileImageUrl = uploadResult?.secure_url;
  }

  const payload = req.body;

  if (profileImageUrl) {
    payload.profileImage = profileImageUrl;
  }

  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });

  return result;
};


export const userService = {
  createUser,
  userGetById,
  updateUser,
  getAllUsers,
};
