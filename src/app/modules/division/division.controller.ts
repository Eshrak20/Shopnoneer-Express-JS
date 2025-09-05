/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { JwtUserPayload } from "../../interfaces/JwtUserPayload.types";
import { DivisionServices } from "./division.service";


const createDivision = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await DivisionServices.createDivision(req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Division created successfully",
            data: result,
        });
    }
);

const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body; // string code like "DHK"
    const payload = req.body;
    const verifiedToken = req.user as JwtUserPayload;

    const division = await DivisionServices.updateDivision(
      code, // pass string
      payload,
      verifiedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Division Updated Successfully",
      data: division,
    });
  }
);



const getAllDivision = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await DivisionServices.getAllDivision(req.query);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All Division Retrieved Successfully",
            data: result.data,
            meta: result.meta,
        });
    }
);

const getSingleDivision = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { code } = req.body;
        const result = await DivisionServices.getSingleDivision(code);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Division Retrieved Successfully",
            data: result,
        });
    }
);


export const DivisionControllers = {
    createDivision,
    updateDivision,
    getAllDivision,
    getSingleDivision
};
