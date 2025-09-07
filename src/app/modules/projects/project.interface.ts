import { Types } from "mongoose";

export interface TProject {
    name: string;
    nameBn?: string;
    division: Types.ObjectId;
    district: Types.ObjectId;
    upazila: Types.ObjectId;
    housing: Types.ObjectId;
    road?: string;
    block?: string;
    plotNumber?: string;
    plotSize?: number;
    plotFace?: string;
    storied?: number;
    noOfUnits?: number;
    noOfBeds?: number;
    noOfBaths?: number;
    floorArea?: number;
    floorNo?: number;
    ownerName: string;
    ownerPhone: string;
    ownerEmail?: string;
    totalPrice: number;
    ratePerSqr: number;
    isCorner?: boolean;
    parkingAvailable?: boolean;
    description?: string;
    projectImages?: string[];

    // relation
    amenities: Types.ObjectId[];
};
