import { prisma } from "../../shared/prisma";
import { ICreatePlanInput } from "./travelPlan.interface";


export const createPlan = async (payload: ICreatePlanInput, id:string) => {
  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid startDate or endDate");
  }

  const result = await prisma.travelPlan.create({
    data: {
      title: payload.title,
      destination: payload.destination,
      startDate, 
      endDate,   
      budget: payload.budget,
      travelType: payload.travelType,
      description: payload.description || null,
      visibility: payload.visibility,
      hostId:id
    },
  });

  return result;
};


const getTravelPlanById = async (id: string) => {
  const result = await prisma.travelPlan.findUnique({
    where: {
      id: id,
    },
    include: {
      host: true,
      participants: true,
      reviews:{
        select:{
          comment:true,
          rating:true,
          createdAt:true,
          reviewer:true
        }
      },
      
       
    },
  });
  return result;
};

// const getAllTravelPlan = async () => {
//   const result = await prisma.travelPlan.findMany({
//     include:{
//       host:true,
//       reviews:true,
//       participants:true
//     }
//   });
//   return result;
// };

interface FilterParams {
  destination?: string;
  startDate?: string;
  endDate?: string;
  interests?: string[];
}

export const getAllTravelPlan = async (filters: FilterParams) => {
  const { destination, startDate, endDate } = filters;

  const where: any = {}; // start with empty

  if (destination) {
    where.destination = { contains: destination, mode: "insensitive" };
  }

  if (startDate) {
    where.startDate = { gte: new Date(startDate) };
  }

  if (endDate) {
    where.endDate = { lte: new Date(endDate) };
  }

  const result = await prisma.travelPlan.findMany({
    where,
    include: {
      host: true,
      reviews: true,
      participants: true,
    },
  });

  return result;
};

const getMyTravelPlan = async (id: string) => {
  const result = await prisma.travelPlan.findMany({
    where: { 
      hostId:id
    }
  });
  return result;
};

const updatePlan = async (payload: any, id: string) => {
  const result = await prisma.travelPlan.update({
    where: { id },
    data: {
      title: payload.title,
      destination: payload.destination,
      startDate: new Date(payload.startDate), 
      endDate: new Date(payload.endDate),  
      budget: payload.budget,
      travelType: payload.travelType,
      description: payload.description,
      visibility: payload.visibility,
    },
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
  deletePlan,
  getTravelPlanById,
  getMyTravelPlan,
};
