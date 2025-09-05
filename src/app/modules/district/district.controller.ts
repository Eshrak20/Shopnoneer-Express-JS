/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { JwtUserPayload } from "../../interfaces/JwtUserPayload.types";
import { DistrictServices } from "./district.service";

const createDistrict = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await DistrictServices.createDistrict(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "District created successfully",
      data: result,
    });
  }
);

const updateDistrict = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;
    const payload = req.body;
    const verifiedToken = req.user as JwtUserPayload;

    const district = await DistrictServices.updateDistrict(
      code,
      payload,
      verifiedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "District Updated Successfully",
      data: district,
    });
  }
);

const getAllDistrict = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await DistrictServices.getAllDistrict(req.query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All District Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleDistrict = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;
    const result = await DistrictServices.getSingleDistrict(code);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "District Retrieved Successfully",
      data: result,
    });
  }
);

export const DistrictControllers = {
  createDistrict,
  updateDistrict,
  getAllDistrict,
  getSingleDistrict,
};
