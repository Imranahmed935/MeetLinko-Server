import { TravelType } from "../../../generated/prisma/enums";



export type IPlanFilterRequest = {
    destination?: string | undefined;
    travelType?: TravelType;
    startDate?: string | undefined;
    endDate?: string | undefined;
    searchTerm?: string | undefined;
}

export interface ICreatePlanInput {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelType:
    | "ADVENTURE"
    | "BUSINESS"
    | "FAMILY"
    | "SOLO"
    | "FRIENDS"
    | "HONEYMOON"
    | "COUPLE";
  description?: string;
  visibility: boolean;
  hostId: string;
}