import { Schema, model } from "mongoose";
import { IDivision } from "./division.interface";
import { IsActive } from "../user/user.interface";

const divisionSchema = new Schema<IDivision>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        nameBn: {
            type: String,
            required: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        isActive: {
            type: String,
            enum: Object.values(IsActive),
            default: IsActive.ACTIVE,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,

    }
);

export const DivisionModel = model<IDivision>("Division", divisionSchema);
