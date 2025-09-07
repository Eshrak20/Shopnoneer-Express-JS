import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";
// import { createProjectValidation } from "./project.validation";
// import validateRequest from "../../middlewares/validateRequest";

const router = Router();

// Create Project (with amenities)
router.post(
  "/create-project",
  checkAuth(Role.ADMIN),
  // validateRequest(createProjectValidation),
  ProjectController.createProject
);
// Upload Project Images (multiple files)
router.post(
  "/:projectId/add-images",
  checkAuth(Role.ADMIN),
  multerUpload.array("files", 10), // 'files' key for multiple images
  ProjectController.addProjectImages
);

// Get all Projects
router.get(
  "/get-all-projects",
  checkAuth(Role.ADMIN),
  ProjectController.getAllProjects
);

// Get single Project
router.get(
  "/get-single-project/:id",
  checkAuth(Role.ADMIN),
  ProjectController.getSingleProject
);

// Update Project
router.patch(
  "/update-project/:id",
  checkAuth(Role.ADMIN),
  // validateRequest(updateProjectValidation),
  ProjectController.updateProject
);

// Delete Project
router.delete(
  "/delete-project/:id",
  checkAuth(Role.ADMIN),
  ProjectController.deleteProject
);

export const ProjectRoutes = router;
