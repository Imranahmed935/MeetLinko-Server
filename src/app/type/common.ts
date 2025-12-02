import { Role } from "../../generated";


export type IJWTPayload = {
    email: string;
    role: Role;
}