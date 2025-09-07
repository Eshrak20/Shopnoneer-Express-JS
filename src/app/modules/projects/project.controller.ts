import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.createProjectWithAmenities(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const addProjectImages = catchAsync(
  async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const images = req.files as Express.Multer.File[]; // assuming multiple files uploaded
    const imageUrls = images.map(img => img.path); // get paths from uploaded files

    const updatedProject = await ProjectService.addProjectImages(
      projectId,
      imageUrls
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Project Images Added Successfully",
      data: updatedProject,
    });
  }
);



const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects fetched successfully",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getSingleProject(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project fetched successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.updateProject(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.deleteProject(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  addProjectImages
};
