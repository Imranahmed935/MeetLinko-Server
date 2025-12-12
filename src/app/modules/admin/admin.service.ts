
import { Status } from "../../../generated/enums";
import catchAsync from "../../shared/catchAsync";
import { prisma } from "../../shared/prisma";

const getAllUser = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: {
        not: "ADMIN",
      },
    },
  });
  return result;
};

const getUserById = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: {
      reviews: true,
    },
  });
  return result;
};


export const updateStatus = async (
  id: string,
  payload: { userStatus: Status }
) => {
  const result = await prisma.user.update({
    where: { id },
    data: {
      userStatus: payload.userStatus,
    },
  });

  return result;
};


const deleteUserById = async (id: string) => {
  await prisma.payment.deleteMany({
    where: { userId: id },
  });

  await prisma.subscription.deleteMany({
    where: { userId: id },
  });

  await prisma.review.deleteMany({
    where: { reviewerId: id },
  });

  const result = await prisma.user.delete({
    where: { id },
  });

  return result;
};

const softDelete = async (id: string, status: Status) => {
  const result = await prisma.user.update({
    where: { id },
    data: {
      userStatus: status,
    },
  });

  return result;
};

const getAllTravelPlan = async () => {
  const result = await prisma.travelPlan.findMany({
    include:{
      host:true
    }
  });
  return result;
};

const getPlanById = async (id: string) => {
  return prisma.travelPlan.findUnique({
    where: { id },
  });
};


const deletePlanById = async (id: string) => {
  await prisma.review.deleteMany({
    where: {
      travelPlanId: id,
    },
  });

  return prisma.travelPlan.delete({
    where: { id },
  });
};


const deleteReviewById = async (id: string) => {
  await prisma.review.delete({
    where:{
      id:id
    }
  })
};


const getAllReview = async () => {
  const result = await prisma.review.findMany({
    include:{
      reviewer:true
    }
  });
  return result;
};

export const getAdminStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalTravelPlans = await prisma.travelPlan.count();
  const totalReviews = await prisma.review.count();

  return {
    users: totalUsers,
    travelPlans: totalTravelPlans,
    reviews: totalReviews,
  };
};
 


export const adminService = {
  deleteReviewById,
  getAllUser,
  getAllTravelPlan,
  getAllReview,
  getUserById,
  deleteUserById,
  softDelete,
  deletePlanById,
  getPlanById,
  updateStatus,
  getAdminStats
};
