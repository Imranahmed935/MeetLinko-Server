import { TravelType } from "../../../generated";


export type IPlanFilterRequest = {
    destination?: string | undefined;
    travelType?: TravelType;
    startDate?: string | undefined;
    endDate?: string | undefined;
    searchTerm?: string | undefined;
}