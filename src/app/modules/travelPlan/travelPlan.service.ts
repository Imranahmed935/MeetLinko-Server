import { prisma } from "../../shared/prisma";

const createPlan = async (payload: any) => {
  const result = await prisma.travelPlan.create({
    data: payload,
  });

  return result;
};


const getAllTravelPlan = async () => {
  const result = await prisma.travelPlan.findMany();
  return result;
};

export const travelPlanService = {
  createPlan,
  getAllTravelPlan
};
