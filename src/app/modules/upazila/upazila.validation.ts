import { z } from "zod";

// Active status enum
export const isActiveEnum = z.enum(["ACTIVE", "BLOCKED"]);

// MongoDB ObjectId regex
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Create Upazila schema
export const createUpazilaZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameBn: z.string().min(1, "Bangla name is required"),
  code: z.string().min(1, "Code is required"),
  district: z
    .string()
    .regex(objectIdRegex, "District must be a valid ObjectId"), // 🔗 reference validation
  isActive: isActiveEnum.optional(),
});

// Update schema (all fields optional)
export const updateUpazilaZodSchema = createUpazilaZodSchema.partial();
