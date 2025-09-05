import { z } from "zod";

// Active status enum
export const isActiveEnum = z.enum(["ACTIVE", "BLOCKED"]);

// zod schema
export const createDivisionZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    nameBn: z.string().min(1, "Bangla name is required"),
    code: z.string().min(1, "Code is required"), 
    isActive: isActiveEnum.optional(),
});

export const updateDivisionZodSchema = createDivisionZodSchema.partial();
