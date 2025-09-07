"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAmenitiesValidation = void 0;
// amenities.validation.ts
const zod_1 = require("zod");
exports.createAmenitiesValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        nameBn: zod_1.z.string().optional(),
        iconWeb: zod_1.z.string().url().optional(),
        iconAndroid: zod_1.z.string().url().optional(),
        iconIos: zod_1.z.string().url().optional(),
    }),
});
