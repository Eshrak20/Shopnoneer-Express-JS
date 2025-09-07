/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { FacilitiesModel } from "./facilities.model";
import { IFacilities } from "./facilities.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { PivotModel } from "../pivot/pivot.model"; // make sure path is correct

const createFacilities = async (payload: Partial<IFacilities>) => {
  const { name, upazila, district, division } = payload;

  // optional duplicate check
  const isExist = await FacilitiesModel.findOne({ name, upazila, district, division });
  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Facility already exists.");
  }

  const facilities = await FacilitiesModel.create(payload);
  return facilities;
};

const updateFacilities = async (id: string, payload: Partial<IFacilities>) => {
  const facility = await FacilitiesModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  return facility;
};

const deleteFacilities = async (id: string) => {
  const facility = await FacilitiesModel.findByIdAndDelete(id);
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  return facility;
};

const getAllFacilities = async (query: Record<string, any>) => {
  const baseQuery = FacilitiesModel.find()
    .populate("upazila", "name nameBn")
    .populate("district", "name nameBn code")
    .populate("division", "name nameBn code");

  const queryBuilder = new QueryBuilder(baseQuery, query);
  const userQuery = queryBuilder
    .search(["name", "nameBn"])
    .filter()
    .sort()
    .fields()
    .paginate();

  const facilities = await userQuery.build();
  const meta = await queryBuilder.getMeta();

  // attach housings via pivot
  const facilitiesWithHousing = await Promise.all(
    facilities.map(async (facility) => {
      const pivots = await PivotModel.find({ facilitiesId: facility._id }).populate("housingId", "name nameBn");
      const housings = pivots.map(p => p.housingId);
      return { ...facility.toObject(), housings };
    })
  );

  return { data: facilitiesWithHousing, meta };
};

const getSingleFacilities = async (id: string) => {
  const facility = await FacilitiesModel.findById(id)
    .populate("upazila", "name nameBn")
    .populate("district", "name nameBn code")
    .populate("division", "name nameBn code");

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  const pivots = await PivotModel.find({ facilitiesId: facility._id }).populate("housingId", "name nameBn");
  const housings = pivots.map(p => p.housingId);

  return { ...facility.toObject(), housings };
};

export const FacilitiesServices = {
  createFacilities,
  updateFacilities,
  deleteFacilities,
  getAllFacilities,
  getSingleFacilities,
};
