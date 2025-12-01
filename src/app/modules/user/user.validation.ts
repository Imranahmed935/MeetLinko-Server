import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z.string().min(10, "Full name must be at least 10 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password is too long"),
  profileImage: z.string().url().optional(),
  bio: z.string().max(200).optional(),
  travelInterests: z.array(z.string()).optional(),
  visitedCountries: z.array(z.string()).optional(),
  currentLocation: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});


export const UserValidation = {
    createUserSchema
}