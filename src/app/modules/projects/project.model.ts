// project.model.ts
import { Schema, model } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new Schema<TProject>(
  {
    name: { type: String, required: true },
    nameBn: { type: String },

    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    district: { type: Schema.Types.ObjectId, ref: "District", required: true },
    upazila: { type: Schema.Types.ObjectId, ref: "Upazila", required: true },
    housing: { type: Schema.Types.ObjectId, ref: "Housing", required: true },

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
  },
  { timestamps: true , versionKey: false}
);

export const ProjectModel = model<TProject>("Project", projectSchema);
