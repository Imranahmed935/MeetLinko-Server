

// import { Status } from "../../../generated";
// import { prisma } from "../../shared/prisma"

import { Status } from "../../../generated/prisma/enums";
import { prisma } from "../../shared/prisma";



const getAllUser = async () => {
  const result = await prisma.user.findMany()
  return result;
};

const getUserById = async (id:string) => {
  const result = await prisma.user.findUnique({
    where:{id}
  })
  return result;
};

const deleteUserById = async (id: string) => {

  await prisma.payment.deleteMany({
    where: { userId: id }
  });

  await prisma.subscription.deleteMany({
    where:{userId:id}
  })

  await prisma.review.deleteMany({
    where:{reviewerId:id}
  })

  const result = await prisma.user.delete({
    where: { id }
  });

  return result;
};

const softDelete = async (id: string, status: Status) => {
  const result = await prisma.user.update({
    where: { id },
    data: {
      userStatus: status 
    }
  });

  return result;
};

const getAllTravelPlan = async () => {
  const result = await prisma.travelPlan.findMany()
  return result;
};

const getPlanById = async (id: string) => {
  return prisma.travelPlan.findUnique({
    where: { id }
  });
};

const deletePlanById = async (id: string) => {

  await prisma.review.deleteMany({
    where:{
      travelPlanId:id
    }
  })

  return prisma.travelPlan.delete({
    where: { id }
  });
};

const getAllReview = async () => {
  const result = await prisma.review.findMany()
  return result;
};

export const adminService ={
    getAllUser,
    getAllTravelPlan,
    getAllReview,
    getUserById,
    deleteUserById,
    softDelete,
    deletePlanById,
    getPlanById
}