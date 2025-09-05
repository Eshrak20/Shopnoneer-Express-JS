import { Schema, model } from "mongoose";
import { IDistrict } from "./district.interface";
import { IsActive } from "../user/user.interface";

const districtSchema = new Schema<IDistrict>(
  {
    name: { type: String, required: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const DistrictModel = model<IDistrict>("District", districtSchema);
