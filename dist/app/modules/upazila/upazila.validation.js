"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUpazilaZodSchema = exports.createUpazilaZodSchema = exports.isActiveEnum = void 0;
const zod_1 = require("zod");
// Active status enum
exports.isActiveEnum = zod_1.z.enum(["ACTIVE", "BLOCKED"]);
// MongoDB ObjectId regex
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
// Create Upazila schema
exports.createUpazilaZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    nameBn: zod_1.z.string().min(1, "Bangla name is required"),
    code: zod_1.z.string().min(1, "Code is required"),
    district: zod_1.z
        .string()
        .regex(objectIdRegex, "District must be a valid ObjectId"), // 🔗 reference validation
    isActive: exports.isActiveEnum.optional(),
});
// Update schema (all fields optional)
exports.updateUpazilaZodSchema = exports.createUpazilaZodSchema.partial();
