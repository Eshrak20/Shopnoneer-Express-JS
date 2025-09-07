"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenitiesModel = void 0;
// amenities.model.ts
const mongoose_1 = require("mongoose");
const amenitiesSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    nameBn: { type: String, trim: true },
    iconWeb: { type: String },
    iconAndroid: { type: String },
    iconIos: { type: String },
}, { timestamps: true, versionKey: false });
exports.AmenitiesModel = (0, mongoose_1.model)("Amenities", amenitiesSchema);
