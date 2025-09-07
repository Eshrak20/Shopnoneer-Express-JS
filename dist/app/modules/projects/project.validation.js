"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectValidation = void 0;
// project.validation.ts
const zod_1 = require("zod");
exports.createProjectValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        nameBn: zod_1.z.string().optional(),
        division: zod_1.z.string(),
        district: zod_1.z.string(),
        upazila: zod_1.z.string(),
        housing: zod_1.z.string(),
        road: zod_1.z.string().optional(),
        block: zod_1.z.string().optional(),
        plotNumber: zod_1.z.string().optional(),
        plotSize: zod_1.z.number().optional(),
        plotFace: zod_1.z.string().optional(),
        storied: zod_1.z.number().optional(),
        noOfUnits: zod_1.z.number().optional(),
        noOfBeds: zod_1.z.number().optional(),
        noOfBaths: zod_1.z.number().optional(),
        floorArea: zod_1.z.number().optional(),
        floorNo: zod_1.z.number().optional(),
        ownerName: zod_1.z.string(),
        ownerPhone: zod_1.z.string(),
        ownerEmail: zod_1.z.string().email().optional(),
        totalPrice: zod_1.z.number(),
        ratePerSqr: zod_1.z.number(),
        isCorner: zod_1.z.boolean().optional(),
        parkingAvailable: zod_1.z.boolean().optional(),
        description: zod_1.z.string().optional(),
        projectImages: zod_1.z.array(zod_1.z.string().url()).optional(),
        amenities: zod_1.z.array(zod_1.z.string()).optional(), // multiple IDs
    }),
});
