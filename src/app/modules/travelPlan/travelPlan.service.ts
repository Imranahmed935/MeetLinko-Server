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

const updatePlan = async (payload: any, id: string) => {
  const result = await prisma.travelPlan.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};


const deletePlan = async (id: string) => {
  const result = await prisma.travelPlan.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const travelPlanService = {
  createPlan,
  getAllTravelPlan,
  updatePlan,
  deletePlan
};
