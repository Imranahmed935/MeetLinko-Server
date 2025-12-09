import { Role } from "../../generated/prisma/enums";


export type IJWTPayload = {
    id:string;
    email: string;
    role: Role;
}