import { Types } from "mongoose";
import { IsActive } from "../user/user.interface";

export interface IUpazila {
  name: string;
  nameBn: string;
  code: string;
  district: Types.ObjectId; // 🔗 reference to District
  isActive?: IsActive;
}
