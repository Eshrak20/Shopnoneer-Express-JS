"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHousingZodSchema = exports.createHousingZodSchema = exports.isActiveEnum = void 0;
const zod_1 = require("zod");
// Active status enum
exports.isActiveEnum = zod_1.z.enum(["ACTIVE", "BLOCKED"]);
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
// zod schema
exports.createHousingZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    nameBn: zod_1.z.string().min(1, "Bangla name is required"),
    division: zod_1.z
        .string()
        .regex(objectIdRegex, "Division must be a valid ObjectId"),
    district: zod_1.z
        .string()
        .regex(objectIdRegex, "District must be a valid ObjectId"),
    upazila: zod_1.z
        .string()
        .regex(objectIdRegex, "Upazila must be a valid ObjectId"),
    latitude: zod_1.z
        .number({ invalid_type_error: "Latitude must be a number" })
        .refine((val) => val >= -90 && val <= 90, "Latitude must be between -90 and 90"),
    longitude: zod_1.z
        .number({ invalid_type_error: "Longitude must be a number" })
        .refine((val) => val >= -180 && val <= 180, "Longitude must be between -180 and 180"),
    location: zod_1.z.string().min(1, "location is required"),
    code: zod_1.z.string().min(1, "Code is required"),
    isActive: exports.isActiveEnum.optional(),
});
exports.updateHousingZodSchema = exports.createHousingZodSchema.partial();
