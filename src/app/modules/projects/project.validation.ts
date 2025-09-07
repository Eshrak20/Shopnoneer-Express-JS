// project.validation.ts
import { z } from "zod";

export const createProjectValidation = z.object({
  body: z.object({
    name: z.string(),
    nameBn: z.string().optional(),
    division: z.string(),
    district: z.string(),
    upazila: z.string(),
    housing: z.string(),

    road: z.string().optional(),
    block: z.string().optional(),
    plotNumber: z.string().optional(),
    plotSize: z.number().optional(),
    plotFace: z.string().optional(),
    storied: z.number().optional(),
    noOfUnits: z.number().optional(),
    noOfBeds: z.number().optional(),
    noOfBaths: z.number().optional(),
    floorArea: z.number().optional(),
    floorNo: z.number().optional(),

    ownerName: z.string(),
    ownerPhone: z.string(),
    ownerEmail: z.string().email().optional(),

    totalPrice: z.number(),
    ratePerSqr: z.number(),

    isCorner: z.boolean().optional(),
    parkingAvailable: z.boolean().optional(),
    description: z.string().optional(),
    projectImages: z.array(z.string().url()).optional(),

    amenities: z.array(z.string()).optional(), // multiple IDs
  }),
});
