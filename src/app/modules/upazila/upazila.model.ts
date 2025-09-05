import { Schema, model } from "mongoose";
import { IUpazila } from "./upazila.interface";
import { IsActive } from "../user/user.interface";

const upazilaSchema = new Schema<IUpazila>(
  {
    name: { type: String, required: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    district: { type: Schema.Types.ObjectId, ref: "District", required: true }, // 🔗 relation
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const UpazilaModel = model<IUpazila>("Upazila", upazilaSchema);
