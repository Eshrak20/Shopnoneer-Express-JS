/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IUpazila } from "./upazila.interface";
import { UpazilaModel } from "./upazila.model";
import { Role } from "../user/user.interface";

const createUpazila = async (payload: Partial<IUpazila>) => {
    const { name, nameBn, code, ...rest } = payload;

    const isUpazilaExist = await UpazilaModel.findOne({ code });
    if (isUpazilaExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Upazila already exists.");
    }

    const upazila = await UpazilaModel.create({
        name,
        nameBn,
        code,
        ...rest,
    });

    return upazila;
};

const updateUpazila = async (
    code: string,
    payload: Partial<IUpazila>,
    decodedToken: JwtPayload
) => {
    const ifUpazilaExist = await UpazilaModel.findOne({ code });

    if (!ifUpazilaExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Upazila Not Found");
    }

    if (decodedToken.role !== Role.ADMIN) {
        throw new AppError(httpStatus.FORBIDDEN, "Only Admin Can update upazila");
    }

    const updatedUpazila = await UpazilaModel.findOneAndUpdate(
        { code },
        payload,
        { new: true, runValidators: true }
    );

    return updatedUpazila;
};

const getAllUpazila = async (query: Record<string, any>) => {
    const baseQuery = UpazilaModel.find()
        .populate({
            path: "district",          // populate district
            select: "name nameBn code", // fields to include
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

const getSingleUpazila = async (upazilaCode: string | number) => {
    const upazila = await UpazilaModel.findOne({ code: upazilaCode });

    if (!upazila) {
        throw new Error("Upazila not found");
    }

    return upazila;
};

export const UpazilaServices = {
    createUpazila,
    updateUpazila,
    getAllUpazila,
    getSingleUpazila,
};
