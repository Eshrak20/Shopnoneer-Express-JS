import { z } from "zod";

// Active status enum
export const isActiveEnum = z.enum(["ACTIVE", "BLOCKED"]);

// zod schema
export const createDivisionZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    nameBn: z.string().min(1, "Bangla name is required"),
    code: z.string().min(1, "Code is required"),  // ✅ string এ করে নাও
    isActive: isActiveEnum.optional(),
    params: z.object({
        code: z.string(), // comes from URL
    }),
});

export const updateDivisionZodSchema = createDivisionZodSchema.partial();
