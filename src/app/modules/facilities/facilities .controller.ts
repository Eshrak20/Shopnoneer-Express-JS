/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FacilitiesServices } from "./facilities.service";

const createFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilitiesServices.createFacilities(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Facility created successfully",
    data: result,
  });
});

const updateFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilitiesServices.updateFacilities(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilitiesServices.deleteFacilities(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility deleted successfully",
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilitiesServices.getAllFacilities(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Facilities Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilitiesServices.getSingleFacilities(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility Retrieved Successfully",
    data: result,
  });
});

export const FacilitiesControllers = {
  createFacilities,
  updateFacilities,
  deleteFacilities,
  getAllFacilities,
  getSingleFacilities,
};
