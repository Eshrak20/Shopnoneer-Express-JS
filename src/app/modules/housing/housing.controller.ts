/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HousingServices } from "./housing.service";

const createHousingWithFacilities = async (req: Request, res: Response) => {
  try {
    const result = await HousingServices.createHousingWithFacilities(req.body);
    res.status(201).json({
      success: true,
      message: "Housing with facilities created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateHousing = catchAsync(async (req: Request, res: Response) => {
  const result = await HousingServices.updateHousing(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Housing updated successfully",
    data: result,
  });
});

const deleteHousing = catchAsync(async (req: Request, res: Response) => {
  const result = await HousingServices.deleteHousing(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Housing deleted successfully",
    data: result,
  });
});

const getAllHousing = catchAsync(async (req: Request, res: Response) => {
  const result = await HousingServices.getAllHousing(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Housing Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleHousing = catchAsync(async (req: Request, res: Response) => {
  const result = await HousingServices.getSingleHousing(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Housing Retrieved Successfully",
    data: result,
  });
});

export const HousingControllers = {
  createHousingWithFacilities,
  updateHousing,
  deleteHousing,
  getAllHousing,
  getSingleHousing,
};
