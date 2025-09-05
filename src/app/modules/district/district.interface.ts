import { IsActive } from "../user/user.interface";
import { Types } from "mongoose";

export interface IDistrict {
  name: string;
  nameBn: string;
  code: string;
  division: Types.ObjectId; 
  isActive?: IsActive;
}
