import { z } from "zod";

// Active status enum
export const isActiveEnum = z.enum(["ACTIVE", "BLOCKED"]);

// Regex to validate MongoDB ObjectId (24 hex characters)
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Zod schema for creating a District
export const createDistrictZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameBn: z.string().min(1, "Bangla name is required"),
  code: z.string().min(1, "Code is required"),
  division: z
    .string()
    .regex(objectIdRegex, "Division must be a valid ObjectId"), // ✅ validate ObjectId
  isActive: isActiveEnum.optional(),
});

// Zod schema for updating a District (all fields optional)
export const updateDistrictZodSchema = createDistrictZodSchema.partial();
