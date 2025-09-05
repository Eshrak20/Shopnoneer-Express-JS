"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleAndStatusZodSchema = exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
exports.createUserZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: zod_1.z
        .string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: zod_1.z
        .string({ invalid_type_error: "Password must be string" })
        .min(4, { message: "Password must be at least 4 characters long." }),
    // .regex(/^(?=.*[A-Z])/, {
    //   message: "Password must contain at least 1 uppercase letter.",
    // })
    // .regex(/^(?=.*[!@#$%^&*])/, {
    //   message: "Password must contain at least 1 special character.",
    // })
    // .regex(/^(?=.*\d)/, {
    //   message: "Password must contain at least 1 number.",
    // }),
    role: zod_1.z.enum(["USER", "MODERATOR"]).default("USER"),
    isActive: zod_1.z.enum(["ACTIVE", "BLOCKED"]).default("ACTIVE"),
    is_verified: zod_1.z.boolean().default(false),
    // Optional fields
    profilePhoto: zod_1.z.string().optional(),
    shortBio: zod_1.z.string().max(200).optional(),
    phone: zod_1.z
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    education: zod_1.z.string().max(100).optional(),
    occupation: zod_1.z.string().max(100).optional(),
    age: zod_1.z.number().min(0).max(120).optional(),
    presentDivision: zod_1.z.string().max(50).optional(),
    presentDistrict: zod_1.z.string().max(50).optional(),
    presentUpazila: zod_1.z.string().max(50).optional(),
    permanentDivision: zod_1.z.string().max(50).optional(),
    permanentDistrict: zod_1.z.string().max(50).optional(),
    permanentUpazila: zod_1.z.string().max(50).optional(),
    estimatedBudget: zod_1.z.number().min(0).optional(),
    currentCapital: zod_1.z.number().min(0).optional(),
    familyMembers: zod_1.z.number().min(0).optional(),
    monthlyIncome: zod_1.z.number().min(0).optional(),
    preferredFlatSize: zod_1.z.number().min(0).optional(),
    preferredHouseType: zod_1.z.string().max(50).optional(),
});
exports.updateUserZodSchema = exports.createUserZodSchema.partial();
exports.updateUserRoleAndStatusZodSchema = zod_1.z.object({
    role: zod_1.z.enum(["USER", "MODERATOR"]).optional(),
    isActive: zod_1.z.enum(["ACTIVE", "BLOCKED"]).optional(),
    is_verified: zod_1.z.boolean().optional(),
});
