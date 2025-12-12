import { Role } from "../../generated/enums";

export type IJWTPayload = {
  id: string;
  email: string;
  role: Role;
};

export interface FilterParams {
  destination?: string;
  startDate?: string;
  endDate?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
