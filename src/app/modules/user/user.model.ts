 import { Schema, model } from "mongoose";
import { IsActive, IUser, Role } from "./user.interface";

const AuthProviderSchema = new Schema(
  {
    provider: {
      type: String,
      enum: ["google", "credentials"],
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    // 🔹 Required fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
      required: true,
    },
    isVerified: { type: Boolean, default: false, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
      required: true,
    },

    // 🔹 Optional fields
    profilePhoto: { type: String, required: false },
    shortBio: { type: String, required: false },
    auths: [AuthProviderSchema],
    education: { type: String, required: false },
    occupation: { type: String, required: false },
    age: { type: Number, required: false },

    presentDivision: { type: String, required: false },
    presentDistrict: { type: String, required: false },
    presentUpazila: { type: String, required: false },

    permanentDivision: { type: String, required: false },
    permanentDistrict: { type: String, required: false },
    permanentUpazila: { type: String, required: false },

    estimatedBudget: { type: Number, required: false },
    currentCapital: { type: Number, required: false },
    familyMembers: { type: Number, required: false },
    monthlyIncome: { type: Number, required: false },

    preferredFlatSize: { type: Number, required: false },
    preferredHouseType: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const UserModel = model<IUser>("User", UserSchema);
