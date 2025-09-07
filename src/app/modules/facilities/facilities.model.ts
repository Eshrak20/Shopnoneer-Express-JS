import { Schema, model } from "mongoose";
import { IFacilities } from "./facilities.interface";


const facilitiesSchema = new Schema<IFacilities>(
  {
    name: { type: String, required: true },
    nameBn: { type: String, required: true },
    upazila: { type: Schema.Types.ObjectId, ref: "Upazila", required: true },
    district: { type: Schema.Types.ObjectId, ref: "District", required: true },
    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    distance: { type: Number },
  },
  { timestamps: true }
);

export const FacilitiesModel = model<IFacilities>("Facilities", facilitiesSchema);
