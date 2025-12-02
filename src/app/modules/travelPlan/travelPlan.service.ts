
import { prisma } from "../../shared/prisma";

const createPlan = async (payload:any) => {
  const result = await prisma.travelPlan.create({
    data: payload,
  });

  return result;
};

export const travelPlanService = {
  createPlan,
};
