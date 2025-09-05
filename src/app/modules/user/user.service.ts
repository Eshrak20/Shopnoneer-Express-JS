/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { IAuthProvider, IUser, Role } from "./user.interface";
import AppError from "../../errorHelpers/AppError";
import { UserModel } from "./user.model";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Ifile } from "../../interfaces/file.types";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, role = "USER", ...rest } = payload;

  if (!email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required."
    );
  }

  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists.");
  }

  const hashedPassword = await bcryptjs.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND) || 10
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email,
  };

  const user = await UserModel.create({
    email,
    password: hashedPassword,
    role,
    auths: [authProvider],
    isActive: "ACTIVE",
    isVerified: true,
    ...rest,
  });

  return user;
};
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserExist = await UserModel.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.MODERATOR) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.role === Role.ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are Already an Admin");
    }
  }

  if (payload.isActive || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.MODERATOR) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.password) {
    const salt = await bcryptjs.genSalt(Number(envVars.BCRYPT_SALT_ROUND));
    payload.password = await bcryptjs.hash(payload.password, salt);
  }

  const newUpdatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};
const updateUserProfileImage = async (
  userId: string,
  profilePhoto: Ifile, // now expecting just the path string
) => {
  const ifUserExist = await UserModel.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const newUpdatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { profilePhoto },
    {
      new: true,
      runValidators: true,
    }
  );
  if (profilePhoto && ifUserExist.profilePhoto) {
    await deleteImageFromCLoudinary(ifUserExist.profilePhoto)
  }
  return newUpdatedUser;
};

const updateUserRoleAndStatus = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserExist = await UserModel.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  if (ifUserExist.isActive === "BLOCKED") {
    const isOnlyStatusUpdate =
      Object.keys(payload).length === 1 && "isActive" in payload;
    if (!isOnlyStatusUpdate) {
      throw new AppError(
        403,
        "Blocked user can only be updated to change status."
      );
    }
  }
  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.MODERATOR) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.role === Role.ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are Already an Admin");
    }
  }


  if (payload.password) {
    const salt = await bcryptjs.genSalt(Number(envVars.BCRYPT_SALT_ROUND));
    payload.password = await bcryptjs.hash(payload.password, salt);
  }

  const newUpdatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

const myProfile = async (id: string) => {
  const user = await UserModel.findById(id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }
  return { data: user };
};

const getAllUsers = async (query: Record<string, any>) => {
  const baseQuery = UserModel.find({ role: Role.USER });
  const queryBuilder = new QueryBuilder(baseQuery, query);

  const userQuery = queryBuilder
    .search(["phone", "email", "address"]) // only string fields
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    userQuery.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};


const getAllAgents = async (query: Record<string, any>) => {
  const baseQuery = UserModel.find({ role: Role.MODERATOR });
  const queryBuilder = new QueryBuilder(baseQuery, query);

  const userQuery = queryBuilder
    .search(["phone", "email", "_id", "address", "isActive", "isVerified"])
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    userQuery.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

export const UserServices = {
  createUser,
  updateUser,
  updateUserRoleAndStatus,
  updateUserProfileImage,
  getAllUsers,
  getAllAgents,
  myProfile,
};
