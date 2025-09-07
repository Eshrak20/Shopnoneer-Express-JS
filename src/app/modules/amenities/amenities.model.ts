// amenities.model.ts
import { Schema, model } from "mongoose";
import { TAmenities } from "../amenities/amenities.interface";

const amenitiesSchema = new Schema<TAmenities>(
  {
    name: { type: String, required: true, trim: true },
    nameBn: { type: String, trim: true },
    iconWeb: { type: String },
    iconAndroid: { type: String },
    iconIos: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const AmenitiesModel = model<TAmenities>("Amenities", amenitiesSchema);
