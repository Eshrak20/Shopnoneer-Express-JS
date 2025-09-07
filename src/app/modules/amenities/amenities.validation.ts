// amenities.validation.ts
import { z } from "zod";

export const createAmenitiesValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    nameBn: z.string().optional(),
    iconWeb: z.string().url().optional(),
    iconAndroid: z.string().url().optional(),
    iconIos: z.string().url().optional(),
  }),
});
