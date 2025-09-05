import { z } from "zod";

// Active status enum
export const isActiveEnum = z.enum(["ACTIVE", "BLOCKED"]);
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// zod schema
export const createHousingZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    nameBn: z.string().min(1, "Bangla name is required"),
    division: z
        .string()
        .regex(objectIdRegex, "Division must be a valid ObjectId"),
    district: z
        .string()
        .regex(objectIdRegex, "District must be a valid ObjectId"),
    upazila: z
        .string()
        .regex(objectIdRegex, "Upazila must be a valid ObjectId"),
    latitude: z
        .number({ invalid_type_error: "Latitude must be a number" })
        .refine((val) => val >= -90 && val <= 90, "Latitude must be between -90 and 90"),
    longitude: z
        .number({ invalid_type_error: "Longitude must be a number" })
        .refine((val) => val >= -180 && val <= 180, "Longitude must be between -180 and 180"),

    location: z.string().min(1, "location is required"),

    code: z.string().min(1, "Code is required"),
    isActive: isActiveEnum.optional(),
});

export const updateHousingZodSchema = createHousingZodSchema.partial();
