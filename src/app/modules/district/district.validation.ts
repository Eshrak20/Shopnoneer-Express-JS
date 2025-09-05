import { z } from "zod";

export const isActiveEnum = z.enum(["ACTIVE", "BLOCKED"]);

export const createDistrictZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameBn: z.string().min(1, "Bangla name is required"),
  code: z.string().min(1, "Code is required"),
  isActive: isActiveEnum.optional(),
});

export const updateDistrictZodSchema = createDistrictZodSchema.partial();
