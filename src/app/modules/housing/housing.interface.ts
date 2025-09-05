import { Types } from "mongoose";

export interface IHousing {
  name: string;
  nameBn: string;
  upazila: Types.ObjectId;
  district: Types.ObjectId;
  division: Types.ObjectId;
  latitude?: number;
  longitude?: number;
  location?: string;
  facilities?: Types.ObjectId[]; // linked via Pivot or direct reference
}