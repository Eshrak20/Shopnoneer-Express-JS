/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { AmenitiesModel } from "./amenities.model";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { ProjectModel } from "../projects/project.model";

const createAmenity = async (payload: Partial<any>) => {
  const { name } = payload;

  // optional duplicate check
  const exist = await AmenitiesModel.findOne({ name });
  if (exist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Amenity already exists.");
  }

  const amenity = await AmenitiesModel.create(payload);
  return amenity;
};

const updateAmenity = async (id: string, payload: Partial<any>) => {
  const amenity = await AmenitiesModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!amenity) {
    throw new AppError(httpStatus.NOT_FOUND, "Amenity not found");
  }

  return amenity;
};

const deleteAmenity = async (id: string) => {
  // remove amenity
  const amenity = await AmenitiesModel.findByIdAndDelete(id);
  if (!amenity) {
    throw new AppError(httpStatus.NOT_FOUND, "Amenity not found");
  }

  // remove references from projects if project stores amenities array
  await ProjectModel.updateMany(
    { amenities: id },
    { $pull: { amenities: id } }
  );

  return amenity;
};

const getAllAmenities = async (query: Record<string, any>) => {
  const baseQuery = AmenitiesModel.find();

  const queryBuilder = new QueryBuilder(baseQuery, query);
  const userQuery = queryBuilder
    .search(["name", "nameBn"])
    .filter()
    .sort()
    .fields()
    .paginate();

  const amenities = await userQuery.build();
  const meta = await queryBuilder.getMeta();

  // attach projects referencing each amenity (convenience)
  const amenitiesWithProjects = await Promise.all(
    amenities.map(async (amenity) => {
      const projects = await ProjectModel.find({ amenities: amenity._id })
        .select("name nameBn division district upazila housing totalPrice ratePerSqr")
        .populate("division", "name")
        .populate("district", "name")
        .populate("upazila", "name")
        .populate("housing", "name")
        .lean();

      return { ...amenity.toObject(), projects };
    })
  );

  return { data: amenitiesWithProjects, meta };
};

const getSingleAmenity = async (id: string) => {
  const amenity = await AmenitiesModel.findById(id);
  if (!amenity) {
    throw new AppError(httpStatus.NOT_FOUND, "Amenity not found");
  }

  const projects = await ProjectModel.find({ amenities: amenity._id })
    .select("name nameBn division district upazila housing totalPrice ratePerSqr")
    .populate("division", "name")
    .populate("district", "name")
    .populate("upazila", "name")
    .populate("housing", "name")
    .lean();

  return { ...amenity.toObject(), projects };
};

export const AmenitiesService = {
  createAmenity,
  updateAmenity,
  deleteAmenity,
  getAllAmenities,
  getSingleAmenity,
};
