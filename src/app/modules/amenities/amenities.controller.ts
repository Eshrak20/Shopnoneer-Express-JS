/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AmenitiesService } from "./amenities.service";

const createAmenity = catchAsync(async (req: Request, res: Response) => {
  const result = await AmenitiesService.createAmenity(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Amenity created successfully",
    data: result,
  });
});

const updateAmenity = catchAsync(async (req: Request, res: Response) => {
  const result = await AmenitiesService.updateAmenity(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Amenity updated successfully",
    data: result,
  });
});

const deleteAmenity = catchAsync(async (req: Request, res: Response) => {
  const result = await AmenitiesService.deleteAmenity(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Amenity deleted successfully",
    data: result,
  });
});

const getAllAmenities = catchAsync(async (req: Request, res: Response) => {
  const result = await AmenitiesService.getAllAmenities(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All amenities retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleAmenity = catchAsync(async (req: Request, res: Response) => {
  const result = await AmenitiesService.getSingleAmenity(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Amenity retrieved successfully",
    data: result,
  });
});

export const AmenitiesController = {
  createAmenity,
  updateAmenity,
  deleteAmenity,
  getAllAmenities,
  getSingleAmenity,
};
