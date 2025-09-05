/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import httpStatus from "http-status-codes";
import { IsActive } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";

export const checkAuth =
  (...authRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const accessToken = req.cookies?.accessToken || req.headers.authorization;
        if (!accessToken) {
          throw new AppError(403, "No Token Received");
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

        const user = await UserModel.findOne({ email: verifiedToken.email });
        if (!user) {
          throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
        }

        if (user.isActive === IsActive.BLOCKED) {
          if (verifiedToken.role !== "ADMIN") {
            throw new AppError(httpStatus.FORBIDDEN, "User is BLOCKED");
          }
        }

        if (!authRoles.includes(verifiedToken.role)) {
          throw new AppError(403, "You are not permitted to view this route!!!");
        }

        req.user = verifiedToken;
        next();
      } catch (error) {
        console.log("jwt error", error);
        next(error);
      }
    };

