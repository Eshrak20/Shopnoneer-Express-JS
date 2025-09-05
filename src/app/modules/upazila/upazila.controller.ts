/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { JwtUserPayload } from "../../interfaces/JwtUserPayload.types";
import { UpazilaServices } from "./upazila.service";

const createUpazila = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UpazilaServices.createUpazila(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Upazila created successfully",
      data: result,
    });
  }
);

const updateUpazila = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;
    const payload = req.body;
    const verifiedToken = req.user as JwtUserPayload;

    const upazila = await UpazilaServices.updateUpazila(
      code,
      payload,
      verifiedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Upazila Updated Successfully",
      data: upazila,
    });
  }
);

const getAllUpazila = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UpazilaServices.getAllUpazila(req.query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Upazila Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleUpazila = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;
    const result = await UpazilaServices.getSingleUpazila(code);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Upazila Retrieved Successfully",
      data: result,
    });
  }
);

export const UpazilaControllers = {
  createUpazila,
  updateUpazila,
  getAllUpazila,
  getSingleUpazila,
};
