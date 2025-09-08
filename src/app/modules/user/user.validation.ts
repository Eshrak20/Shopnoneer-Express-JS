import { z } from "zod";

export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string({ invalid_type_error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(4, { message: "Password must be at least 4 characters long." }),
    // .regex(/^(?=.*[A-Z])/, {
    //   message: "Password must contain at least 1 uppercase letter.",
    // })
    // .regex(/^(?=.*[!@#$%^&*])/, {
    //   message: "Password must contain at least 1 special character.",
    // })
    // .regex(/^(?=.*\d)/, {
    //   message: "Password must contain at least 1 number.",
    // }),
  role: z.enum(["USER", "MODERATOR"]).default("USER"),
  isActive: z.enum(["ACTIVE", "BLOCKED"]).default("ACTIVE"),
  is_verified: z.boolean().default(false),

  // Optional fields
  profilePhoto: z.string().optional(),
  shortBio: z.string().max(200).optional(),
  phone: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  education: z.string().max(100).optional(),
  occupation: z.string().max(100).optional(),
  age: z.number().min(0).max(120).optional(),

  presentDivision: z.string().max(50).optional(),
  presentDistrict: z.string().max(50).optional(),
  presentUpazila: z.string().max(50).optional(),

  permanentDivision: z.string().max(50).optional(),
  permanentDistrict: z.string().max(50).optional(),
  permanentUpazila: z.string().max(50).optional(),

  estimatedBudget: z.number().min(0).optional(),
  currentCapital: z.number().min(0).optional(),
  familyMembers: z.number().min(0).optional(),
  monthlyIncome: z.number().min(0).optional(),

  preferredFlatSize: z.number().min(0).optional(),
  preferredHouseType: z.string().max(50).optional(),
});

export const updateUserZodSchema = createUserZodSchema.partial();

export const updateUserRoleAndStatusZodSchema = z.object({
  role: z.enum(["USER", "MODERATOR"]).optional(),
  isActive: z.enum(["ACTIVE", "BLOCKED"]).optional(),
  is_verified: z.boolean().optional(),
});
