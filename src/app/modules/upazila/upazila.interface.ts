import { IsActive } from "../user/user.interface";

export interface IUpazila {
  name: string;
  nameBn: string;
  code: string;
  isActive?: IsActive;
}
