import { prisma } from "../../shared/prisma";


const createReview = async (payload: any) => {
  const result = await prisma.review.create({
    data: payload,
  });
  return result;
};


export const reviewsService = {
    createReview
}