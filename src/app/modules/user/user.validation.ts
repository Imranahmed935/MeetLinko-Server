import { z } from "zod";

export const createUserSchema = z
  .object({
    fullName: z.string().min(10, "Full name must be at least 10 characters"),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password is too long"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters")
      .max(128, "Confirm password is too long"),

    travelInterests: z.array(z.string()).optional(),
    visitedCountries: z.array(z.string()).optional(),
    currentLocation: z.string().optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UserValidation = {
  createUserSchema,
};
