import { prisma } from "../../shared/prisma"

const getAllUser = async () => {
  const result = await prisma.user.findMany()
  return result;
};

const getAllTravelPlan = async () => {
  const result = await prisma.travelPlan.findMany()
  return result;
};

const getAllReview = async () => {
  const result = await prisma.review.findMany()
  return result;
};

export const adminService ={
    getAllUser,
    getAllTravelPlan,
    getAllReview
}