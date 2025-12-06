import { Role } from "../../generated/prisma/enums";


export type IJWTPayload = {
    email: string;
    role: Role;
}