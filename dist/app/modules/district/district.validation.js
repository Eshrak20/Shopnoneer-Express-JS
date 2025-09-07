"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDistrictZodSchema = exports.createDistrictZodSchema = exports.isActiveEnum = void 0;
const zod_1 = require("zod");
exports.isActiveEnum = zod_1.z.enum(["ACTIVE", "BLOCKED"]);
// Regex to validate MongoDB ObjectId (24 hex characters)
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.createDistrictZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    nameBn: zod_1.z.string().min(1, "Bangla name is required"),
    code: zod_1.z.string().min(1, "Code is required"),
    division: zod_1.z
        .string()
        .regex(objectIdRegex, "Division must be a valid ObjectId"),
    isActive: exports.isActiveEnum.optional(),
});
exports.updateDistrictZodSchema = exports.createDistrictZodSchema.partial();
