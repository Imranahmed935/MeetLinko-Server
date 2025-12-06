import { TravelType } from "../../../generated/prisma/enums";



export type IPlanFilterRequest = {
    destination?: string | undefined;
    travelType?: TravelType;
    startDate?: string | undefined;
    endDate?: string | undefined;
    searchTerm?: string | undefined;
}