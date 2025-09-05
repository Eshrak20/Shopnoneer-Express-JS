import { IsActive } from "../user/user.interface";

export interface IDistrict {
  name: string;
  nameBn: string;
  code: string;
  isActive?: IsActive;
}
