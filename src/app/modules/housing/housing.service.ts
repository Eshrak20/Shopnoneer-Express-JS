/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { HousingModel } from "./housing.model";
import { IHousing } from "./housing.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { PivotModel } from "../pivot/pivot.model";

const createHousingWithFacilities = async (payload: any) => {
  // 1. Create housing
  const housing = await HousingModel.create({
    name: payload.name,
    nameBn: payload.nameBn,
    upazila: payload.upazila,
    district: payload.district,
    division: payload.division,
    latitude: payload.latitude,
    longitude: payload.longitude,
    location: payload.location,
  });

  // 2. Insert pivot records for selected facilities
  if (payload.facilityIds && payload.facilityIds.length > 0) {
    const pivotDocs = payload.facilityIds.map((fid: any) => ({
      housingId: housing._id,
      facilitiesId: fid,
    }));
    await PivotModel.insertMany(pivotDocs);
  }

  return housing;
};

const updateHousing = async (id: string, payload: Partial<IHousing>) => {
  const housing = await HousingModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!housing) {
    throw new AppError(httpStatus.NOT_FOUND, "Housing not found");
  }

  return housing;
};

const deleteHousing = async (id: string) => {
  const housing = await HousingModel.findByIdAndDelete(id);
  if (!housing) {
    throw new AppError(httpStatus.NOT_FOUND, "Housing not found");
  }

  // also delete pivot relations
  await PivotModel.deleteMany({ housingId: id });

  return housing;
};

const getAllHousing = async (query: Record<string, any>) => {
  // 1. Base query for housings
  const baseQuery = HousingModel.find()
    .populate("upazila", "name nameBn")
    .populate("district", "name nameBn code")
    .populate("division", "name nameBn code");

  // 2. Apply search, filter, sort, paginate
  const queryBuilder = new QueryBuilder(baseQuery, query);
  const userQuery = queryBuilder
    .search(["name", "nameBn"])
    .filter()
    .sort()
    .fields()
    .paginate();

  // 3. Execute query
  const housings = await userQuery.build();
  const meta = await queryBuilder.getMeta();

  // 4. Fetch facilities for each housing via pivot
  const housingWithFacilities = await Promise.all(
    housings.map(async (housing) => {
      const pivots = await PivotModel.find({ housingId: housing._id }).populate("facilitiesId", "name type");
      const facilities = pivots.map(p => p.facilitiesId);
      return { ...housing.toObject(), facilities };
    })
  );

  return { data: housingWithFacilities, meta };
};


const getSingleHousing = async (id: string) => {
  // 1. Get housing info
  const housing = await HousingModel.findById(id)
    .populate("upazila", "name nameBn")
    .populate("district", "name nameBn code")
    .populate("division", "name nameBn code");

  if (!housing) {
    throw new AppError(httpStatus.NOT_FOUND, "Housing not found");
  }

  // 2. Get facilities via pivot table
  const pivots = await PivotModel.find({ housingId: id }).populate("facilitiesId", "name type");

  // 3. Extract facilities
  const facilities = pivots.map(p => p.facilitiesId);

  return { ...housing.toObject(), facilities };
};


export const HousingServices = {
  createHousingWithFacilities,
  updateHousing,
  deleteHousing,
  getAllHousing,
  getSingleHousing,
};
