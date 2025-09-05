/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IDivision } from "./division.interface";
import { DivisionModel } from "./division.model";
import { Role } from "../user/user.interface";

const createDivision = async (payload: Partial<IDivision>) => {
    const { name, nameBn, code, ...rest } = payload;

    const isDivisionExist = await DivisionModel.findOne({ code });
    if (isDivisionExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Division already exists.");
    }

    const user = await DivisionModel.create({
        name,
        nameBn,
        code,
        ...rest,
    });

    return user;
};

const updateDivision = async (
  code: string,
  payload: Partial<IDivision>,
  decodedToken: JwtPayload
) => {
  const ifDivisionExist = await DivisionModel.findOne({ code });

  if (!ifDivisionExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Division Not Found");
  }

  if (decodedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, "Only Admin Can update division");
  }

  const updatedDivision = await DivisionModel.findOneAndUpdate(
    { code },
    payload,
    { new: true, runValidators: true }
  );

  return updatedDivision;
};



const getAllDivision = async (query: Record<string, any>) => {
    const baseQuery = DivisionModel.find({});
    const queryBuilder = new QueryBuilder(baseQuery, query);

    const userQuery = queryBuilder
        .search(["name", "nameBn", "code"]) // only string fields
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


const getSingleDivision = async (divisionCode: string | number) => {
    const division = await DivisionModel.findOne({ code: divisionCode });

    if (!division) {
        throw new Error("Division not found");
    }

    return division;
};



export const DivisionServices = {
    createDivision,
    updateDivision,
    getAllDivision,
    getSingleDivision
};
