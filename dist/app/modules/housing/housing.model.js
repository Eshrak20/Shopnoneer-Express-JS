"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousingModel = void 0;
const mongoose_1 = require("mongoose");
const housingSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    nameBn: { type: String, required: true },
    upazila: { type: mongoose_1.Schema.Types.ObjectId, ref: "Upazila", required: true },
    district: { type: mongoose_1.Schema.Types.ObjectId, ref: "District", required: true },
    division: { type: mongoose_1.Schema.Types.ObjectId, ref: "Division", required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    location: { type: String },
}, { timestamps: true, versionKey: false });
exports.HousingModel = (0, mongoose_1.model)("Housing", housingSchema);
