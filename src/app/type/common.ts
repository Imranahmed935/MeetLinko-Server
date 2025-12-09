import { Role } from "../../generated/enums";

export type IJWTPayload = {
  id: string;
  email: string;
  role: Role;
};
