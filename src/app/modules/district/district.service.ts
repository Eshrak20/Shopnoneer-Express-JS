/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IDistrict } from "./district.interface";
import { DistrictModel } from "./district.model";
import { Role } from "../user/user.interface";

const createDistrict = async (payload: Partial<IDistrict>) => {
    const { name, nameBn, code, ...rest } = payload;

    const isDistrictExist = await DistrictModel.findOne({ code });
    if (isDistrictExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "District already exists.");
    }

    const district = await DistrictModel.create({
        name,
        nameBn,
        code,
        ...rest,
    });

    return district;
};

const updateDistrict = async (
    code: string,
    payload: Partial<IDistrict>,
    decodedToken: JwtPayload
) => {
    const ifDistrictExist = await DistrictModel.findOne({ code });

    if (!ifDistrictExist) {
        throw new AppError(httpStatus.NOT_FOUND, "District Not Found");
    }

    if (decodedToken.role !== Role.ADMIN) {
        throw new AppError(httpStatus.FORBIDDEN, "Only Admin Can update district");
    }

    const updatedDistrict = await DistrictModel.findOneAndUpdate(
        { code },
        payload,
        { new: true, runValidators: true }
    );

    return updatedDistrict;
};

const getAllDistrict = async (query: Record<string, any>) => {
    const baseQuery = DistrictModel.find()
        .populate({
            path: "division",          
            select: "name nameBn code",
        });

    const queryBuilder = new QueryBuilder(baseQuery, query);
    const userQuery = queryBuilder
        .search(["name", "nameBn", "code"])
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

const getSingleDistrict = async (districtCode: string | number) => {
    const district = await DistrictModel.findOne({ code: districtCode });

    if (!district) {
        throw new Error("District not found");
    }

    return district;
};

export const DistrictServices = {
    createDistrict,
    updateDistrict,
    getAllDistrict,
    getSingleDistrict,
};
