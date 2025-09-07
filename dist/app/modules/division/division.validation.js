"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDivisionZodSchema = exports.createDivisionZodSchema = exports.isActiveEnum = void 0;
const zod_1 = require("zod");
// Active status enum
exports.isActiveEnum = zod_1.z.enum(["ACTIVE", "BLOCKED"]);
// zod schema
exports.createDivisionZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    nameBn: zod_1.z.string().min(1, "Bangla name is required"),
    code: zod_1.z.string().min(1, "Code is required"),
    isActive: exports.isActiveEnum.optional(),
});
exports.updateDivisionZodSchema = exports.createDivisionZodSchema.partial();
