// import { TravelType } from "../../../generated";

import { TravelType } from "@prisma/client";


export type IPlanFilterRequest = {
    destination?: string | undefined;
    travelType?: TravelType;
    startDate?: string | undefined;
    endDate?: string | undefined;
    searchTerm?: string | undefined;
}