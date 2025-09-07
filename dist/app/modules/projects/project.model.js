"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
// project.model.ts
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    nameBn: { type: String },
    division: { type: mongoose_1.Schema.Types.ObjectId, ref: "Division", required: true },
    district: { type: mongoose_1.Schema.Types.ObjectId, ref: "District", required: true },
    upazila: { type: mongoose_1.Schema.Types.ObjectId, ref: "Upazila", required: true },
    housing: { type: mongoose_1.Schema.Types.ObjectId, ref: "Housing", required: true },
    road: { type: String },
    block: { type: String },
    plotNumber: { type: String },
    plotSize: { type: Number },
    plotFace: { type: String },
    storied: { type: Number },
    noOfUnits: { type: Number },
    noOfBeds: { type: Number },
    noOfBaths: { type: Number },
    floorArea: { type: Number },
    floorNo: { type: Number },
    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    ownerEmail: { type: String },
    totalPrice: { type: Number, required: true },
    ratePerSqr: { type: Number, required: true },
    isCorner: { type: Boolean, default: false },
    parkingAvailable: { type: Boolean, default: false },
    description: { type: String },
    projectImages: [{ type: String }],
    // relation
    // amenities: [{ type: Schema.Types.ObjectId, ref: "Amenities" }],
}, { timestamps: true, versionKey: false });
exports.ProjectModel = (0, mongoose_1.model)("Project", projectSchema);
