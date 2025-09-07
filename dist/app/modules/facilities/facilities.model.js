"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesModel = void 0;
const mongoose_1 = require("mongoose");
const facilitiesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    nameBn: { type: String, required: true },
    upazila: { type: mongoose_1.Schema.Types.ObjectId, ref: "Upazila", required: true },
    district: { type: mongoose_1.Schema.Types.ObjectId, ref: "District", required: true },
    division: { type: mongoose_1.Schema.Types.ObjectId, ref: "Division", required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    distance: { type: Number },
}, { timestamps: true });
exports.FacilitiesModel = (0, mongoose_1.model)("Facilities", facilitiesSchema);
