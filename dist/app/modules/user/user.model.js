"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const AuthProviderSchema = new mongoose_1.Schema({
    provider: {
        type: String,
        enum: ["google", "credentials"],
        required: true,
    },
    providerId: {
        type: String,
        required: true,
    },
}, { _id: false });
const UserSchema = new mongoose_1.Schema({
    // 🔹 Required fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE,
        required: true,
    },
    isVerified: { type: Boolean, default: false, required: true },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.USER,
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
}, {
    timestamps: true,
    versionKey: false,
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
