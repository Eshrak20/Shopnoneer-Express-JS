/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectModel } from "./project.model";
import { TProject } from "./project.interface";
import { AmenitiesModel } from "../amenities/amenities.model";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { ProjectAmenitiesPivotModel } from "../projectAmenitiesPivot/projectAmenitiesPivot.model";


const createProjectWithAmenities = async (payload: TProject) => {
  const { amenities, ...projectData } = payload;

  // Filter out null/invalid IDs
  const validAmenityIds = amenities?.filter(aid => aid != null) || [];

  if (validAmenityIds.length > 0) {
    const count = await AmenitiesModel.countDocuments({ _id: { $in: validAmenityIds } });
    if (count !== validAmenityIds.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Some amenities not found");
    }
  }

  // Create project
  const project = await ProjectModel.create(projectData);

  // Create pivot records
  if (validAmenityIds.length > 0) {
    const pivotDocs = validAmenityIds.map(aid => ({
      projectId: project._id,
      amenitiesId: aid,
    }));

    console.log("Pivot docs:", pivotDocs); // <--- DEBUG

    await ProjectAmenitiesPivotModel.insertMany(pivotDocs, { ordered: false });
  }

  // Fetch all linked amenities via pivot
  const pivotRecords = await ProjectAmenitiesPivotModel.find({ projectId: project._id });
  const amenityIds = pivotRecords.map(p => p.amenitiesId);

  const linkedAmenities = await AmenitiesModel.find({ _id: { $in: amenityIds } })
    .select("name nameBn iconWeb iconAndroid iconIos");
  return { ...project.toObject(), amenities: linkedAmenities };
};


const addProjectImages = async (
  projectId: string,
  newImages: string[] // array of image URLs/paths
) => {
  const project = await ProjectModel.findById(projectId);
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  // Append new images to existing ones
  project.projectImages = [...(project.projectImages || []), ...newImages];
  await project.save();

  return project;
};


const getAllProjects = async () => {
  return ProjectModel.find()
    .populate("division", "name nameBn")
    .populate("district", "name nameBn")
    .populate("upazila", "name nameBn")
    .populate("housing", "name")
    .populate("amenities", "name nameBn iconWeb");
};

const getSingleProject = async (projectId: string) => {
  // 1. Get the project
  const project = await ProjectModel.findById(projectId)
    .populate("division", "name nameBn")
    .populate("district", "name nameBn")
    .populate("upazila", "name nameBn")
    .populate("housing", "name");

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  // 2. Get amenities via pivot
  const pivotRecords = await ProjectAmenitiesPivotModel.find({ projectId });
  const amenityIds = pivotRecords.map(p => p.amenitiesId);

  const amenities = await AmenitiesModel.find({ _id: { $in: amenityIds } })
    .select("name nameBn iconWeb iconAndroid iconIos");

  // 3. Attach amenities to project object
  return { ...project.toObject(), amenities };
};

const updateProject = async (id: string, payload: Partial<TProject>) => {
  // optional: validate amenities if provided
  if (payload.amenities && payload.amenities.length > 0) {
    const count = await AmenitiesModel.countDocuments({
      _id: { $in: payload.amenities },
    });
    if (count !== payload.amenities.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Some amenities not found");
    }
  }

  const project = await ProjectModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("division", "name nameBn")
    .populate("district", "name nameBn")
    .populate("upazila", "name nameBn")
    .populate("housing", "name")
    .populate("amenities", "name nameBn iconWeb");

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  return project;
};

const deleteProject = async (id: string) => {
  const project = await ProjectModel.findByIdAndDelete(id);
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }
  return project;
};

export const ProjectService = {
  createProjectWithAmenities,
  addProjectImages,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
