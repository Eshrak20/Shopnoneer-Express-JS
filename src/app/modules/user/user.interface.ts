import { Types } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  MODERATOR = "MODERATOR",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}


export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;

  profilePhoto?: string;
  shortBio?: string;
  auths?: IAuthProvider[];

  isActive: IsActive;
  isVerified: boolean;
  role: Role;

  // Optional fields
  education?: string;
  occupation?: string;
  age?: number;

  presentDivision?: string;
  presentDistrict?: string;
  presentUpazila?: string;

  permanentDivision?: string;
  permanentDistrict?: string;
  permanentUpazila?: string;

  estimatedBudget?: number;
  currentCapital?: number;
  familyMembers?: number;
  monthlyIncome?: number;

  preferredFlatSize?: number;
  preferredHouseType?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
