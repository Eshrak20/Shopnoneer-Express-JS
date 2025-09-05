import { Types } from "mongoose";

export interface IFacilities {
  name: string;
  nameBn: string;
  upazila: Types.ObjectId;
  district: Types.ObjectId;
  division: Types.ObjectId;
  latitude?: number;
  longitude?: number;
  distance?: number;
  housing?: Types.ObjectId[]; // will store Housing _id(s) if needed
}
