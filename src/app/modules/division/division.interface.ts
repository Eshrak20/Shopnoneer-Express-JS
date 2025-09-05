import { Types } from "mongoose";
import { IsActive } from "../user/user.interface";

export interface IDivision {
  _id?: Types.ObjectId;
  name: string;
  nameBn: string;
  totalDistricts: number;

  code: string;
  isActive: IsActive;
 

  createdAt?: Date;
  updatedAt?: Date;
}
