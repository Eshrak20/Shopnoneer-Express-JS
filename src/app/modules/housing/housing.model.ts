import { Schema, model } from "mongoose";
import { IHousing } from "./housing.interface";



const housingSchema = new Schema<IHousing>(
  {
    name: { type: String, required: true },
    nameBn: { type: String, required: true },
    upazila: { type: Schema.Types.ObjectId, ref: "Upazila", required: true },
    district: { type: Schema.Types.ObjectId, ref: "District", required: true },
    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    location: { type: String },
  },
  { timestamps: true , versionKey: false}
);

export const HousingModel = model<IHousing>("Housing", housingSchema);
